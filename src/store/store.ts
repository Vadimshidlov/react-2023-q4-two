import { combineReducers, configureStore } from '@reduxjs/toolkit';
import searchReducer from '@/store/SearchSlice.ts';
import pagesReducer from '@/store/PagesSlice.ts';
import viewModeReducer from '@/store/ViewModeSlice';
import { heroesAPI } from '@/services/HeroesService.ts';

const rootReducer = combineReducers({
  searchReducer,
  pagesReducer,
  viewModeReducer,
  [heroesAPI.reducerPath]: heroesAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(heroesAPI.middleware),
  });
};

export type RootStateType = ReturnType<typeof rootReducer>;
export type SearchStoreType = ReturnType<typeof setupStore>;
export type SearchDispatchType = SearchStoreType['dispatch'];
