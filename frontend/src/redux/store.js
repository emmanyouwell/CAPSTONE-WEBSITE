// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import articleReducer from './slices/articleSlice';
import donorReducer from './slices/donorSlice';
const store = configureStore({
  reducer: {
    users: userReducer,// Add your reducers here
    articles: articleReducer,
    donors: donorReducer
  },
});

export default store;
