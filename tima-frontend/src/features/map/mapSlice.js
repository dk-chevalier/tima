import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  popup: {
    popupIsOpen: false,
    popupInfo: null,
  },
};

const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    updatePopup(state, action) {
      // payload = popupInfo
      state.popup.popupInfo = action.payload;
    },
    openPopup(state) {
      state.popup.popupIsOpen = true;
    },
    closePopup(state) {
      state.popup.popupIsOpen = false;
    },
  },
});

// inside the slice we get access to the action creators (inside .actions) which we can then export
export const { updatePopup, openPopup, closePopup } = mapSlice.actions;

// then we export the slice.reducer, which we can use to set up our store (in the store.js file)
export default mapSlice.reducer;

// selector functions using Reselect libraries createSelector()...
const selectMap = (state) => state.map;

export const selectPopupStatus = createSelector(
  selectMap,
  (map) => map.popup.popupIsOpen,
);

export const selectPopupInfo = createSelector(
  selectMap,
  (map) => map.popup.popupInfo,
);

export const selectOpenPopup = createSelector(
  [selectPopupStatus, selectPopupInfo],
  (popupStatus, popupInfo) => {
    return popupStatus ? popupInfo : null;
  },
);
