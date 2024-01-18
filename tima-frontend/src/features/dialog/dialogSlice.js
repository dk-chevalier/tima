import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    openDialog(state, action) {
      state.isOpen = true;
    },
    closeDialog(state, action) {
      state.isOpen = false;
    },
  },
});

export const { openDialog, closeDialog } = dialogSlice.actions;

export default dialogSlice.reducer;

const selectDialogState = (state) => state.dialog;

export const selectDialogStatus = createSelector(
  selectDialogState,
  (dialog) => dialog.isOpen,
);
