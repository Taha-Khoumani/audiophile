import { configureStore } from '@reduxjs/toolkit';
import navReducer from "../features/nav/navSlice.js"
import productReducer from "../features/products/productsSlice"

export const store = configureStore({
  reducer: {
    nav:navReducer,
    products:productReducer,
  },
});
