import { useRef } from 'react';
import './UncontrolledForm.scss';

export type SubmitDataType = {
  firstName: string | undefined;
  lastName: string | undefined;
  age: string | undefined;
};

function UncontrolledForm() {
  const firstNameInput = useRef<HTMLInputElement>(null);
  const lastNameInput = useRef<HTMLInputElement>(null);
  const ageInput = useRef<HTMLInputElement>(null);

  const onSubmit = (e: React.FormEvent) => {
    const submitData: SubmitDataType = {
      firstName: firstNameInput?.current?.value,
      lastName: lastNameInput?.current?.value,
      age: ageInput?.current?.value,
    };
    console.log(submitData);

    e.preventDefault();
  };

  return (
    <div className="form__container">
      <form className="form" onSubmit={onSubmit}>
        <label htmlFor="firstNameInput">
          First name:
          <div>
            <input type="text" ref={firstNameInput} id="firstNameInput" />
          </div>
        </label>
        <label htmlFor="firstNameInput">
          Last name:
          <input type="text" ref={lastNameInput} id="firstNameInput" />
        </label>
        <label htmlFor="firstNameInput">
          Age:
          <input type="text" ref={ageInput} id="firstNameInput" />
        </label>
        <label htmlFor="firstNameInput">
          Email:
          <input type="text" ref={ageInput} id="firstNameInput" />
        </label>

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default UncontrolledForm;
