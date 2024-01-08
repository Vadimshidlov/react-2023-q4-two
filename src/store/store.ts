import { PreloadedState, combineReducers, configureStore } from '@reduxjs/toolkit';
import searchReducer from '@/store/SearchSlice.ts';
import pagesReducer from '@/store/PagesSlice.ts';
import viewModeReducer from '@/store/ViewModeSlice';
import unControlledFormReducer from '@/store/UnControlledFormSlice';
import countriesReducer from '@/store/CountriesSlice';
import { heroesAPI } from '@/services/HeroesService.ts';

const rootReducer = combineReducers({
  searchReducer,
  pagesReducer,
  viewModeReducer,
  unControlledFormReducer,
  countriesReducer,
  [heroesAPI.reducerPath]: heroesAPI.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootStateType>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(heroesAPI.middleware),
  });
};

export type RootStateType = ReturnType<typeof rootReducer>;
export type SearchStoreType = ReturnType<typeof setupStore>;
export type SearchDispatchType = SearchStoreType['dispatch'];
