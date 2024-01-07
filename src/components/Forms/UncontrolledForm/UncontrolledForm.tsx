import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import './UncontrolledForm.scss';
import { ValidationError } from 'yup';
import { useNavigate } from 'react-router-dom';
import { userScheme } from '@/components/Forms/UncontrolledForm/validateScheme';
import { getValidationErrorsObject } from '@/components/Forms/UncontrolledForm/getValidationErrorsObject';

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

  useEffect(() => {
    console.log(formErrors);
  }, [formErrors]);

  const clearFormData = useCallback(
    (list: InputsListType[]): void => {
      setFormErrors(getInitialFormErrors());

      list.forEach((element) => {
        const el = element;

        if (el.current) {
          el.current.value = '';
        }
      });

      navigate('/');
    },
    [navigate]
  );

  const onSubmit = async (e: React.FormEvent) => {
    console.log('onSubmit function');

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

      console.log(submitData, 'submitData');

      await userScheme.validate(submitData, { abortEarly: false });

      console.log('Data is correct!');
      clearFormData(listOfInputs);
    } catch (error) {
      console.log(error, 'CATCH');

      if (error instanceof ValidationError) {
        const errorsList = [...error.inner];

        console.log(errorsList, 'errorsList');
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
          <input type="password" ref={passwordRef} id="password" name="password" />
          <span className="form__error">
            {formErrors.password ? <p>{formErrors.password}</p> : null}
          </span>
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

        <label htmlFor="file" className="form__item">
          Avatar:
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
