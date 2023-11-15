import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { heroesAPI } from '@/services/HeroesService';

interface IViewMode {
  isViewMode: boolean;
  isViewModeLoading: boolean;
}

const initialState: IViewMode = {
  isViewMode: false,
  isViewModeLoading: false,
};

const viewModeSlice = createSlice({
  name: 'viewMode',
  initialState,
  reducers: {
    changeViewMode(state, action: PayloadAction<boolean>) {
      state.isViewMode = action.payload;
    },
    changeViewModeLoading(state, action: PayloadAction<boolean>) {
      state.isViewModeLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(heroesAPI.endpoints?.fetchSelectHero.matchPending, (state) => {
      state.isViewModeLoading = true;
    });
    builder.addMatcher(heroesAPI.endpoints?.fetchSelectHero.matchFulfilled, (state) => {
      state.isViewModeLoading = false;
    });
  },
});

export const { changeViewMode } = viewModeSlice.actions;

export default viewModeSlice.reducer;
