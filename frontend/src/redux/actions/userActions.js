import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { authenticate, getToken, logout } from '../../utils/helper';

// import {server as VITE_APP_URL} from '../store';
// import {VITE_APP_URL} from '../store';
const VITE_APP_URL = import.meta.env.VITE_APP_URL;
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (credentials, thunkAPI) => {
    const { email, password } = credentials;
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    };
    try {
      console.log(`${VITE_APP_URL}/api/v1/login`);
      // console.log(credentials);
      const response = await axios.post(`${VITE_APP_URL}/api/v1/login`, credentials, config);

      await authenticate(response.data, () => { });
      return response.data;

    } catch (error) {
      console.log('Error:', error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${VITE_APP_URL}/api/v1/logout`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, 
        }
      );
      await logout();
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getUserDetails = createAsyncThunk(
  'user/getUserDetails',
  async (_, thunkAPI) => {

    const token = await getToken();
    console.log('Token Retrieved:', token);

    if (!token) {
      throw new Error('No token available');
    }

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      withCredentials: true
    }
    try {
      console.log("Getting user details");
      const response = await axios.get(
        `${VITE_APP_URL}/api/v1/me`,
        config
      );

      return response.data; // Optionally return the response if necessary for further actions

    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


export const registerUser = createAsyncThunk(
  'user/registerUser',

  async (userData, thunkAPI) => {
    console.log("Registering User");
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true
    };
    try {

      const response = await axios.post(`${VITE_APP_URL}/api/v1/register`, userData, config);
      await authenticate(response.data, () => { });
      return response;

    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
)


export const getUser = createAsyncThunk(
  'user/getUser', // Action type prefix
  async (_, thunkAPI) => {
    try {
      if (typeof window !== 'undefined') {
        const user = sessionStorage.getItem('user');
        if (user) {
          // Parse and return the user data
          return JSON.parse(user);
        } else {
          // Reject if user data is not found
          return thunkAPI.rejectWithValue('No user found in session storage');
        }
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);