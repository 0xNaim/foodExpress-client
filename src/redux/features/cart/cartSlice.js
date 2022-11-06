import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],
  message: '',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // Find product that already exist in the cart
      const product = state.cart.find(
        (item) => item.slug === action.payload.slug
      );

      if (product) {
        // If product already exist then update the product quantity
        product.quantity += 1;
        state.message = 'Product Quantity Updated';
      } else {
        // Otherwise, push the product into the cart
        state.cart.push(action.payload);
        state.message = 'Product Added To Cart';
      }
    },
    removeFromCart: (state, action) => {
      // Return new array
      state.cart = state.cart.filter((item) => item.slug !== action.payload.slug);
      state.message ='Product Removed From The Cart'
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
