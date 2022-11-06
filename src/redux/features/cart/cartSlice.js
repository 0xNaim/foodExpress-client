import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // Find product that already exist in the cart
      const product = state.cart.find(
        (product) => product.slug === action.payload.slug
      );

      if (product) {
        // If product already exist then update the product quantity
        product.quantity += 1;
      } else {
        // Otherwise, push the product into the cart
        state.cart.push(action.payload);
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
