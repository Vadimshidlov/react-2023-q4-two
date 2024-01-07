/* eslint-disable import/prefer-default-export */
import * as yup from 'yup';

export function getValidationErrorsObject(errorsList: yup.ValidationError[]): {
  [key: string]: string;
} {
  const formErrorsObject: { [key: string]: string } = {
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    password: '',
    secondPassword: '',
    gender: '',
    country: '',
    file: '',
    tAndC: '',
  };

  errorsList.forEach((error) => {
    if (error.path && error.message) {
      if (formErrorsObject[error.path] !== '') {
        return;
      }

      formErrorsObject[error.path] = error.message;
    }
  });

  return formErrorsObject;
}
