import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { getToken } from '../../utils/helper';
const VITE_APP_URL = import.meta.env.VITE_APP_URL;

// Record Record Public Collection
export const recordPublicRecord = createAsyncThunk(
    'collection/recordPublicRecord',
    async (req, thunkAPI) => {

        const token = await getToken();

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

            const response = await axios.post(`${VITE_APP_URL}/api/v1/record-public`, req, config)
            console.log("record public: ", response.data)
            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

// Mark Attendance of donors
export const recordPrivateRecord = createAsyncThunk(
    'collection/recordPrivateRecord',
    async (req, thunkAPI) => {

        const token = await getToken();

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

            const response = await axios.post(`${VITE_APP_URL}/api/v1/record-private`, req, config)
            console.log("record private: ", response.data)
            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(error.message);
        }
    }
)


// Mark Attendance of donors
export const getAllCollections = createAsyncThunk(
    'collection/getAllCollections',
    async (req, thunkAPI) => {

        const token = await getToken();

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

            const response = await axios.get(`${VITE_APP_URL}/api/v1/collections`, config)
            
            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(error.message);
        }
    }
)
