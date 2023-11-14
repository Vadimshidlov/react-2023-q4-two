import { combineReducers, configureStore } from '@reduxjs/toolkit';
import searchReducer from 'src/store/SearchSlice.ts';
import { heroesAPI } from '@/services/HeroesService.ts';

const rootReducer = combineReducers({
  searchReducer,
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
