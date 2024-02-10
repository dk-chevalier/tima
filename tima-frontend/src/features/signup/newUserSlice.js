import { createSlice, createSelector } from '@reduxjs/toolkit';

const initialState = {
  stripePriceId: '',
  stripeCustomerId: '',
  name: '',
  email: '',
};

const newUserSlice = createSlice({
  name: 'newUser',
  initialState,
  reducers: {
    updateStripePriceId(state, action) {
      state.stripePriceId = action.payload;
    },
    updateNewUserDetails(state, action) {
      state = { ...state, ...action.payload };
    },
  },
});

export const { updateStripePriceId, updateNewUserDetails } =
  newUserSlice.actions;

export default newUserSlice.reducer;

export const selectNewUser = (state) => state.newUser;

export const selectStripePrice = createSelector(
  selectNewUser,
  (newUser) => newUser.stripePriceId,
);

export const selectStripeCustomerId = createSelector(
  selectNewUser,
  (newUser) => newUser.stripeCustomerId,
);
