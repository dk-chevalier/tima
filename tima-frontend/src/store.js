import { configureStore } from '@reduxjs/toolkit';

import mapReducer from './features/map/mapSlice';

// creating store using the reducer that we export from our *Slice.js files
const store = configureStore({
  reducer: {
    map: mapReducer,
  },
});

export default store;
