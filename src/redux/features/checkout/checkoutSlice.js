import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  shippingAddress: {},
  shippingCost: 30,
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    resetForm: () => initialState,
  },
});

export const { setAddress, resetForm } = checkoutSlice.actions;
export default checkoutSlice.reducer;
