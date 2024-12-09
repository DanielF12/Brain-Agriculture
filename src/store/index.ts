import { configureStore } from '@reduxjs/toolkit';
import farmReducer from './farmSlice';

export const store = configureStore({
  reducer: {
    farms: farmReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;