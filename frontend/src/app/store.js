
import { configureStore } from '@reduxjs/toolkit';

import cartReducer from '../features/cartSlice';
import productsReducer from '../features/productsSlice';
import authReducer from '../features/authSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    auth: authReducer
  }
});
