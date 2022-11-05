import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../services/auth/authSlice';
import apiSlice from './features/api/apiSlice';
import cartReducer from './features/cart/cartSlice';

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  cart: cartReducer,
});

export default rootReducer;
