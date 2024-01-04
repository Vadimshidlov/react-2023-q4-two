/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from 'react-hook-form';
import './ControlledForm.scss';

type FormDataType = {
  firstName: string;
  lastName: string;
};

const textInput = {
  name: {
    required: 'Required field',
    minLength: {
      value: 2,
      message: 'Very short value',
    },
    max: 15,
  },
};

export default function ControlledForm() {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm<FormDataType>({
    mode: 'onBlur', // Validation with onBlur event
  });

  const submitHandler = (data: FormDataType) => {
    console.log(data);
    reset();
  };

  console.log('render');

  return (
    <div className="form_container">
      <h1>React Hook Form</h1>
      <form className="form" onSubmit={handleSubmit(submitHandler)}>
        <div className="form__input">
          <span>First name:</span>
          <input
            className={errors?.firstName ? 'input-error' : ''}
            type="text"
            {...register('firstName', textInput.name)}
          />
          <div style={{ height: 40, color: 'red' }}>
            {errors?.firstName && <p>{errors.firstName.message || 'Error'}</p>}
          </div>
        </div>
        <div className="form__input">
          <span>Last name:</span>
          <input
            type="text"
            {...register('lastName', {
              required: 'Required field',
              minLength: {
                value: 2,
                message: 'Very short value',
              },
              max: 15,
            })}
          />
          <div style={{ height: 40, color: 'red' }}>
            {errors?.lastName && <p>{errors.lastName.message || 'Error'}</p>}
          </div>
        </div>

        <input type="submit" value="Submit" disabled={!isValid} />
      </form>
    </div>
  );
}
