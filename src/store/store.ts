import { combineReducers, configureStore } from '@reduxjs/toolkit';
import searchReducer from 'src/store/SearchSlice.ts';

const rootReducer = combineReducers({
  searchReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootStateType = ReturnType<typeof rootReducer>;
export type SearchStoreType = ReturnType<typeof setupStore>;
export type SearchDispatchType = SearchStoreType['dispatch'];
