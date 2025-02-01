// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import articleReducer from './slices/articleSlice';
import donorReducer from './slices/donorSlice';
import recipientReducer from './slices/recipientSlice';
import eventReducer from './slices/eventSlice';
const store = configureStore({
  reducer: {
    users: userReducer,// Add your reducers here
    articles: articleReducer,
    donors: donorReducer,
    recipients: recipientReducer,
    events: eventReducer
  },
});

export default store;
