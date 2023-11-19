import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { heroesAPI } from '@/services/HeroesService';
import getTotalPages from '@/shared/utils/getTotalPages';

interface IPages {
  totalPages: number;
  currentPage: number;
}

const initialState: IPages = {
  totalPages: 0,
  currentPage: 1,
};

const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    changeTotalPages(state, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(heroesAPI.endpoints?.fetchAllHeroes.matchFulfilled, (state, action) => {
      state.totalPages = getTotalPages(action.payload.count);
    });
  },
});

export const { changeTotalPages, setCurrentPage } = pagesSlice.actions;

export default pagesSlice.reducer;
