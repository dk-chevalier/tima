import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchIsOpen: false,
};

const searchFormSlice = createSlice({
  name: 'searchForm',
  initialState,
  reducers: {
    openSearchForm(state, action) {
      state.searchIsOpen = true;
    },
    closeSearchForm(state, action) {
      state.searchIsOpen = false;
    },
  },
});

export const { openSearchForm, closeSearchForm } = searchFormSlice.actions;

export default searchFormSlice.reducer;

const selectSearchForm = (state) => state.searchForm;

export const selectSearchOpenStatus = createSelector(
  selectSearchForm,
  (searchForm) => searchForm.searchIsOpen,
);
