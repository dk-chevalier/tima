import { configureStore } from '@reduxjs/toolkit';

import mapReducer from './features/map/mapSlice';
import dialogReducer from './features/dialog/dialogSlice';
import searchFormReducer from './features/search/searchFormSlice';

// creating store using the reducer that we export from our *Slice.js files
const store = configureStore({
  reducer: {
    map: mapReducer,
    dialog: dialogReducer,
    searchForm: searchFormReducer,
  },
});

export default store;
