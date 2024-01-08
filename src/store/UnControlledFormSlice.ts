import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type IunControlledFormType = {
  firstName: string | undefined;
  lastName: string | undefined;
  age: number | undefined;
  email: string | undefined;
  password: string | undefined;
  secondPassword: string | undefined;
  gender: string | undefined;
  country: string | undefined;
  file: string | undefined;
};

export type IunControlledFormDataType = {
  data: IunControlledFormType[];
};

export type SetFormDataType = {
  firstName: string | undefined;
  lastName: string | undefined;
  age: number | undefined;
  email: string | undefined;
  password: string | undefined;
  secondPassword: string | undefined;
  gender: string | undefined;
  country: string | undefined;
  file: string | undefined;
};

const initialState: IunControlledFormDataType = {
  data: [
    // {
    //   firstName: '',
    //   lastName: '',
    //   age: 0,
    //   email: '',
    //   password: '',
    //   secondPassword: '',
    //   gender: '',
    //   country: '',
    //   file: '',
    // },
  ],
};

const unControlledDataSlice = createSlice({
  name: 'unControlledForm',
  initialState,
  reducers: {
    setFormData(state, action: PayloadAction<SetFormDataType>) {
      // state.data = action.payload;
      state.data.push(action.payload);
    },
  },
});

export const { setFormData } = unControlledDataSlice.actions;

export default unControlledDataSlice.reducer;
