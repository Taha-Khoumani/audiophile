import { configureStore } from '@reduxjs/toolkit';
import navReducer from "../features/nav/navSlice.js"

export const store = configureStore({
  reducer: {
    nav:navReducer,
  },
});
