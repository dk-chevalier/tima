import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  // isOpen: false,
  openName: '',
  isModal: false,
};

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    // openDialog(state, action) {
    //   state.isOpen = true;
    // },
    // closeDialog(state, action) {
    //   state.isOpen = false;
    // },
    openDialog(state, action) {
      state.openName = action.payload;
    },
    closeDialog(state, action) {
      state.openName = '';
    },
  },
});

export const { openDialog, closeDialog } = dialogSlice.actions;

export default dialogSlice.reducer;

const selectDialogState = (state) => state.dialog;

export const selectOpenDialog = createSelector(
  selectDialogState,
  (dialog) => dialog.openName,
);
