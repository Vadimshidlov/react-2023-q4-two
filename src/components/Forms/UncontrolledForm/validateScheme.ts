/* eslint-disable import/prefer-default-export */
import * as yup from 'yup';

export const userScheme = yup.object({
  firstName: yup
    .string()
    .required('Firstname is required field')
    .min(1, 'Very short firstname')
    .max(25, 'Very large firstname')
    .matches(/^[a-zA-Zа-яА-Я]*$/, 'Only letters allowed'),
  lastName: yup
    .string()
    .required('Lastname is required field')
    .min(1, 'Very short lastname')
    .max(25, 'Very large lastname')
    .matches(/^[a-zA-Zа-яА-Я]*$/, 'Only letters allowed'),
  age: yup.number().min(0).required('Age is a required field'),
  email: yup
    .string()
    .matches(/^[^\s]*$/, 'Email must not contain a space')
    .required('Email is a required field')
    .email('Email must be in the format user@example.com')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Email must be in the format user@example.com'
    ),
  password: yup
    .string()
    .required('Password is a required field')
    .min(8, 'Password must contain at least 8 characters')
    .matches(/(?=.[A-Z])/, 'The password must be received for one capital letter (AZ)')
    .matches(/(?=.[a-z])/, 'Password must contain at least one lowercase letter (az)')
    .matches(/(?=.\d)/, 'Password must contain at least one number (0-9)')
    .matches(/^[^\s]*$/, 'Password must not contain a space')
    .matches(
      /(?=.[!@#$%^&-])/,
      'The password must contain at least one special character (for example, !@#$%^&-)'
    ),
  secondPassword: yup
    .string()
    .required('Password is a required field')
    .min(8, 'Password must contain at least 8 characters')
    .matches(/(?=.[A-Z])/, 'The password must be received for one capital letter (AZ)')
    .matches(/(?=.[a-z])/, 'Password must contain at least one lowercase letter (az)')
    .matches(/(?=.\d)/, 'Password must contain at least one number (0-9)')
    .matches(/^[^\s]*$/, 'Password must not contain a space')
    .matches(
      /(?=.[!@#$%^&-])/,
      'The password must contain at least one special character (for example, !@#$%^&-)'
    ),
  tAndC: yup.boolean().isTrue().required('You need to acces our private policy'),
});
