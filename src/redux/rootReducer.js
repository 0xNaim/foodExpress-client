import { combineReducers } from '@reduxjs/toolkit';
import authReducer from '../services/auth/authSlice';
import apiSlice from './features/api/apiSlice';

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
});

export default rootReducer;
