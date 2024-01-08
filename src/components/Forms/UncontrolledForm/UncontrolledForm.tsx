/* eslint-disable operator-linebreak */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable consistent-return */
import { RefObject, useCallback, useRef, useState } from 'react';
import './UncontrolledForm.scss';
import { ValidationError } from 'yup';
import { useNavigate } from 'react-router-dom';
import { userScheme } from '@/components/Forms/UncontrolledForm/validateScheme';
import { getValidationErrorsObject } from '@/components/Forms/UncontrolledForm/getValidationErrorsObject';
import { SetFormDataType, setFormData } from '@/store/UnControlledFormSlice';
import { useUncontrolledFormDispatch } from '@/Hooks/redux';
import toBase64 from '../toBase64Helper';

export type SubmitDataType = {
  firstName: string | undefined;
  lastName: string | undefined;
  age: number | undefined;
  email: string | undefined;
  password: string | undefined;
  secondPassword: string | undefined;
  gender: string | undefined;
  country: string | undefined;
  file: FileList | null | undefined;
  tAndC: boolean | undefined;
};

export type FormErrorType = {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  password: string;
  secondPassword: string;
  gender: string;
  country: string;
  file: string;
  tAndC: string;
};

const getInitialFormErrors = (): FormErrorType => ({
  firstName: '',
  lastName: '',
  age: 0,
  email: '',
  password: '',
  secondPassword: '',
  gender: '',
  file: '',
  country: '',
  tAndC: '',
});

type InputsListType = RefObject<HTMLInputElement> | RefObject<HTMLSelectElement>;

function UncontrolledForm() {
  const [formErrors, setFormErrors] = useState<FormErrorType>(getInitialFormErrors());

  const [passwordState, setPasswordState] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [progress, setProgress] = useState<string>('0');

  const getActiveColor = (type: string): string => {
    if (type === 'Strong') return '#3FBB60';
    if (type === 'Medium') return '#FE804D';

    return 'FF0054';
  };

  const handlePassword = (passwordValue: string) => {
    const strengthCheck = {
      length: false,
      hasUpperCase: false,
      hasLowerCase: false,
      hasDigit: false,
      hasSpecialChar: false,
    };

    strengthCheck.length = passwordValue.length >= 8;
    strengthCheck.hasUpperCase = /[A-Z]+/.test(passwordValue);
    strengthCheck.hasLowerCase = /[A-Z]+/.test(passwordValue);
    strengthCheck.hasDigit = /[0-9]+/.test(passwordValue);
    strengthCheck.hasSpecialChar = /[^A-Za-z0-9]+/.test(passwordValue);

    const passwordStrength = Object.values(strengthCheck).filter((value) => value);

    const strength =
      passwordStrength.length === 5 ? 'Strong' : passwordStrength.length >= 2 ? 'Medium' : 'Low';

    setPasswordState(passwordValue);
    setProgress(`${(passwordStrength.length / 5) * 100}%`);
    setMessage(strength);
  };

  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const secondPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const addFileRef = useRef<HTMLInputElement>(null);
  const tAndCRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const uncontrolledFormData = useUncontrolledFormDispatch();

  const listOfInputs: InputsListType[] = [
    firstNameRef,
    lastNameRef,
    ageRef,
    emailRef,
    passwordRef,
    secondPasswordRef,
    genderRef,
    countryRef,
    addFileRef,
    tAndCRef,
  ];

  const clearFormData = useCallback(
    (list: InputsListType[]): void => {
      setFormErrors(getInitialFormErrors());

      list.forEach((element) => {
        const el = element;

        if (el.current) {
          el.current.value = '';
        }
      });

      navigate('/main');
    },
    [navigate]
  );

  const prepareDataForStore = async (data: SubmitDataType): Promise<SetFormDataType> => {
    const {
      firstName,
      age,
      country,
      email,
      file,
      gender,
      lastName,
      password,
      secondPassword,
      tAndC,
    } = data;

    if (file) {
      const fileForCode = file[0];
      const base64File: string = await toBase64(fileForCode);

      return {
        firstName,
        lastName,
        age,
        email,
        password,
        gender,
        country,
        file: base64File,
        secondPassword,
      };
    }

    // Return a default value or throw an error based on your use case
    return Promise.resolve({
      firstName,
      lastName,
      age,
      email,
      password,
      gender,
      country,
      file: '',
      secondPassword,
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const submitData: SubmitDataType = {
        firstName: firstNameRef?.current?.value,
        lastName: lastNameRef?.current?.value,
        age: Number(ageRef?.current?.value),
        email: emailRef?.current?.value,
        password: passwordRef?.current?.value,
        secondPassword: secondPasswordRef?.current?.value,
        gender: genderRef?.current?.value,
        country: countryRef?.current?.value,
        file: addFileRef?.current?.files,
        tAndC: tAndCRef?.current?.checked,
      };

      await userScheme.validate(submitData, { abortEarly: false });

      const data = await prepareDataForStore(submitData);

      uncontrolledFormData(setFormData({ ...data }));

      clearFormData(listOfInputs);
    } catch (error) {
      if (error instanceof ValidationError) {
        const errorsList = [...error.inner];

        setFormErrors((prevState) => ({
          ...prevState,
          ...getValidationErrorsObject(errorsList),
        }));
      }
    }
  };

  return (
    <div className="form__container">
      <form className="form" onSubmit={onSubmit}>
        <label htmlFor="firstName" className="form__item">
          First name:
          <input type="text" ref={firstNameRef} id="firstName" name="firstName" />
          <span className="form__error">
            {formErrors.firstName ? <p>{formErrors.firstName}</p> : null}
          </span>
        </label>
        <label htmlFor="lastName" className="form__item">
          Last name:
          <input type="text" ref={lastNameRef} id="lastName" name="lastName" />
          <span className="form__error">
            {formErrors.lastName ? <p>{formErrors.lastName}</p> : null}
          </span>
        </label>
        <label htmlFor="age" className="form__item">
          Age:
          <input type="text" ref={ageRef} id="age" name="age" />
          <span className="form__error">{formErrors.age ? <p>{formErrors.age}</p> : null}</span>
        </label>
        <label htmlFor="email" className="form__item">
          Email:
          <input type="email" ref={emailRef} id="email" name="email" />
          <span className="form__error">{formErrors.email ? <p>{formErrors.email}</p> : null}</span>
        </label>
        <label htmlFor="password" className="form__item">
          Password:
          <input
            type="password"
            ref={passwordRef}
            id="password"
            name="password"
            value={passwordState}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              handlePassword(e.target.value);
            }}
          />
          <span className="form__error">
            {formErrors.password ? <p>{formErrors.password}</p> : null}
          </span>
          <div className="progress__bar">
            <div
              className="progress"
              style={{
                width: progress,
                backgroundColor: getActiveColor(message),
              }}
            />
          </div>
          {passwordState.length !== 0 ? (
            <p className="message" style={{ color: getActiveColor(message) }}>
              Your password is
              {message}
            </p>
          ) : null}
        </label>
        <label htmlFor="secondPassword" className="form__item">
          Confirm password:
          <input
            type="password"
            ref={secondPasswordRef}
            id="secondPassword"
            name="secondPassword"
          />
          <span className="form__error">
            {formErrors.secondPassword ? <p>{formErrors.secondPassword}</p> : null}
          </span>
        </label>
        <label htmlFor="gender" className="form__item">
          Gender:
          <select
            name="gender"
            id="gender"
            className="form__select"
            defaultValue="female"
            ref={genderRef}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label htmlFor="country" className="form__item">
          Country:
          <input type="text" ref={countryRef} id="country" name="country" />
          <span className="form__error">
            {formErrors.country ? <p>{formErrors.country}</p> : null}
          </span>
        </label>

        <label htmlFor="file" className="form__item__file">
          Chose a photo
          <input type="file" name="file" id="file" ref={addFileRef} />
          <span className="form__error">{formErrors.file ? <p>{formErrors.file}</p> : null}</span>
        </label>

        <label htmlFor="tAndC" className="form__tAndC">
          <div className="tAndC__container">
            <p>Accept T&C: </p>
            <input type="checkbox" name="tAndC" id="tAndC" ref={tAndCRef} />
          </div>

          <span className="form__error">{formErrors.tAndC ? <p>{formErrors.tAndC}</p> : null}</span>
        </label>

        <input type="submit" value="Submit" className="form__button" />
      </form>
    </div>
  );
}

export default UncontrolledForm;
