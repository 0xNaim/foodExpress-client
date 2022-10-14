import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    countIncrement: (state) => {
      state.count = state.count + 1;
    },
    countDecrement: (state) => {
      state.count = state.count - 1;
    },
  },
});

export const { countIncrement, countDecrement } = counterSlice.actions;
export default counterSlice.reducer;
