import { useRef } from 'react';
import './UncontrolledForm.scss';

export type SubmitDataType = {
  firstName: string | undefined;
  lastName: string | undefined;
  age: string | undefined;
  email: string | undefined;
  password: string | undefined;
  secondPassword: string | undefined;
  gender: string | undefined;
  country: string | undefined;
  tAndC: boolean | undefined;
};

function UncontrolledForm() {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const secondPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const tAndCRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submitData: SubmitDataType = {
      firstName: firstNameRef?.current?.value,
      lastName: lastNameRef?.current?.value,
      age: ageRef?.current?.value,
      email: emailRef?.current?.value,
      password: passwordRef?.current?.value,
      secondPassword: secondPasswordRef?.current?.value,
      gender: genderRef?.current?.value,
      country: countryRef?.current?.value,
      tAndC: tAndCRef?.current?.checked,
    };

    console.log(submitData);
  };

  return (
    <div className="form__container">
      <form className="form" onSubmit={onSubmit}>
        <label htmlFor="firstNameInput" className="form__item">
          First name:
          <div>
            <input type="text" ref={firstNameRef} id="firstName" name="firstName" />
          </div>
        </label>
        <label htmlFor="lastName" className="form__item">
          Last name:
          <input type="text" ref={lastNameRef} id="lastName" name="lastName" />
        </label>
        <label htmlFor="age" className="form__item">
          Age:
          <input type="text" ref={ageRef} id="age" name="age" />
        </label>
        <label htmlFor="email" className="form__item">
          Email:
          <input type="email" ref={emailRef} id="email" name="email" />
        </label>
        <label htmlFor="password" className="form__item">
          Password:
          <input type="password" ref={passwordRef} id="password" name="password" />
        </label>
        <label htmlFor="secondPassword" className="form__item">
          Confirm password:
          <input
            type="password"
            ref={secondPasswordRef}
            id="secondPassword"
            name="secondPassword"
          />
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
        </label>

        <label htmlFor="tAndC" className="form__tAndC">
          Accept T&C
          <input type="checkbox" name="tAndC" id="tAndC" ref={tAndCRef} />
        </label>

        <input type="submit" value="Submit" className="form__button" />
      </form>
    </div>
  );
}

export default UncontrolledForm;
