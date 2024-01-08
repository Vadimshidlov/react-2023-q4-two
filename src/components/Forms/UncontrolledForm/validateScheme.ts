/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable import/prefer-default-export */
import * as yup from 'yup';

/* const MAX_FILE_SIZE: number = 102400; // 100KB

interface ValidFileExtensions {
  image: string[];
}

// type File = {
//   name: string;
//   size: number;
// };

const validFileExtensions: ValidFileExtensions = {
  image: ['jpg', 'gif', 'png', 'jpeg', 'svg', 'webp'],
};

function isValidFileType(fileName: string, fileType: 'image' = 'image'): boolean | string {
  const type = fileName.split('.').pop();

  if (!type) {
    return false;
  }

  return fileName && validFileExtensions[fileType].indexOf(type) > -1;
} */

const MAX_FILE_SIZE: number = 1024 * 1024; // 1 MB

function isValidFileType(fileName: string) {
  const data = ['jpg', 'png'];

  const extension: string | undefined = fileName.split('.').pop();

  if (!extension) return null;

  return data.indexOf(extension) > -1;
}

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
  age: yup.number().required('Age is a required field').min(1),
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
    .matches(/(?=.[A-Z])/, 'The password must be received for one capital letter')
    .matches(/(?=.[a-z])/, 'Password must contain at least one lowercase letter')
    .matches(/(?=.\d)/, 'Password must contain at least one number')
    .matches(/^[^\s]*$/, 'Password must not contain a space')
    .matches(/(?=.[!@#$%^&-])/, 'The password must contain at least one special character'),
  secondPassword: yup.string().oneOf([yup.ref('password')], 'Passwords must match'),
  /* secondPassword: yup
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
    ), */
  country: yup
    .string()
    .uppercase()
    .required('Country is required field')
    .oneOf(['US', 'BE', 'RU'], 'Please, write valid country'),
  tAndC: yup
    .boolean()
    .isTrue('You need to acces our private policy')
    .required('You need to acces our private policy'),
  file: yup
    .mixed<FileList>()
    .required('File is required')
    .test('fileSize', 'File is required', (value) => {
      if (value[0]) {
        return true;
      }

      return false;
    })
    .test('fileSize', 'File size is too large', (value) => {
      return value[0] && value[0].size <= MAX_FILE_SIZE;
    })
    .test('fileType', 'Unsupported file format', (value) => {
      return value[0] && ['image/jpeg', 'image/png'].includes(value[0].type);
    }),
});
