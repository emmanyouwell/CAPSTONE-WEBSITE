// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import articleReducer from './slices/articleSlice';
const store = configureStore({
  reducer: {
    users: userReducer,// Add your reducers here
    articles: articleReducer,
  },
});

export default store;
