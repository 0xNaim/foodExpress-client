const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  searchTerm: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searched: (state, action) => {
      state.searchTerm = action.payload;
    },
    clearSearchTerm: state => initialState
  },
});

export const { searched, clearSearchTerm } = searchSlice.actions;
export default searchSlice.reducer;
