import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { heroesAPI } from '@/services/HeroesService.ts';

interface ISearch {
  search: string;
  isLoading: boolean;
  totalPages: number;
}

const initialState: ISearch = {
  search: localStorage.getItem('searchValue') || '',
  isLoading: false,
  totalPages: 0,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    changeSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    startHeroLoading(state) {
      state.isLoading = true;
    },
    stopHeroLoading(state) {
      state.isLoading = false;
    },
    setTotalPages(state, action) {
      state.totalPages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(heroesAPI.endpoints?.fetchAllHeroes.matchPending, (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(heroesAPI.endpoints?.fetchAllHeroes.matchFulfilled, (state) => {
      state.isLoading = false;
    });
  },
});

export const { changeSearch, startHeroLoading } = searchSlice.actions;
export const { stopHeroLoading, setTotalPages } = searchSlice.actions;

export default searchSlice.reducer;
