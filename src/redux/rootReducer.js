import { combineReducers } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/counterSlice";
import apiSlice from "./features/api/apiSlice";

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  counter: counterReducer,
});

export default rootReducer;
