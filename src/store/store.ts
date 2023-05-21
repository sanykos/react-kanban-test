import { combineReducers, configureStore } from '@reduxjs/toolkit';

import boardSlice from './reducers/boardSlice';

const rootReducer = combineReducers({ [boardSlice.name]: boardSlice.reducer });

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
