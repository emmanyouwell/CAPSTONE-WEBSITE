// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import articleReducer from './slices/articleSlice';
import donorReducer from './slices/donorSlice';
import recipientReducer from './slices/recipientSlice';
import eventReducer from './slices/eventSlice';
import inventoryReducer from './slices/inventorySlice';
import fridgeReducer from './slices/fridgeSlice';
import scheduleReducer from './slices/scheduleSlice'
const store = configureStore({
  reducer: {
    users: userReducer,// Add your reducers here
    articles: articleReducer,
    donors: donorReducer,
    recipients: recipientReducer,
    events: eventReducer,
    inventories: inventoryReducer,
    fridges: fridgeReducer,
    schedules: scheduleReducer,
  },
});

export default store;
