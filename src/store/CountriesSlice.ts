import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ICountries {
  countries: string[];
}

const initialState: ICountries = {
  countries: ['Belarus', 'Russia', 'Poland', 'Australia', 'London', 'USA'],
};

const countriesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    addCountry(state, action: PayloadAction<string>) {
      state.countries.push(action.payload);
    },
  },
});

export const { addCountry } = countriesSlice.actions;

export default countriesSlice.reducer;
