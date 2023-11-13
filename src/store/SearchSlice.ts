import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ISearch {
  search: string;
  isLoading: boolean;
}

const initialState: ISearch = {
  search: localStorage.getItem('searchValue') || '',
  isLoading: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    changeSearch(state, action: PayloadAction<string>) {
      console.log(state, action);

      state.search = action.payload;
    },
    startHeroLoading(state) {
      state.isLoading = true;
    },
    stopHeroLoading(state) {
      state.isLoading = false;
    },
  },
});

export const { changeSearch, startHeroLoading, stopHeroLoading } = searchSlice.actions;

export default searchSlice.reducer;
