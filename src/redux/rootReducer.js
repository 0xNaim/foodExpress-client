import { combineReducers } from '@reduxjs/toolkit';
import apiSlice from './features/api/apiSlice';
import authReducer from './features/auth/authSlice';
import cartReducer from './features/cart/cartSlice';
import checkoutReducer from './features/checkout/checkoutSlice';

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
});

export default rootReducer;
