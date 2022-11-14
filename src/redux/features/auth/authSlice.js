import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: undefined,
  user: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
    },
    userLoggedOut: () => initialState,
    updateUserState: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { userLoggedIn, userLoggedOut, updateUserState } =
  authSlice.actions;
export default authSlice.reducer;
