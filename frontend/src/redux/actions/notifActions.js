import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/axiosInstance'
const VITE_APP_URL = import.meta.env.VITE_APP_URL;
// Get Devices with Token
export const getDevices = createAsyncThunk(
    'devices/getDevices',
    async (query, thunkAPI) => {



        const config = {
            headers: {
                'Content-Type': 'application/json',

            },
            withCredentials: true
        }
        try {
            let urlString = `${VITE_APP_URL}/api/v1/notifications`

            const response = await api.get(urlString, config);

            return response.data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

// Add Device for Notification 
export const addDevice = createAsyncThunk(
    'device/addDevice',
    async (req, thunkAPI) => {



        const config = {
            headers: {
                'Content-Type': 'application/json',

            },
            withCredentials: true
        }
        try {

            const response = await api.post(`${VITE_APP_URL}/api/v1/notifications/save-token`, req, config)

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

// Send Notification
export const sendNotification = createAsyncThunk(
    'notification/sendNotification',
    async (req, thunkAPI) => {



        const config = {
            headers: {
                'Content-Type': 'application/json',

            },
            withCredentials: true
        }
        try {

            const response = await api.post(`${VITE_APP_URL}/api/v1/send-notification`, req, config)

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(error.message);
        }
    }
)


// Send Notification
export const sendNotifications = createAsyncThunk(
    'notifications/sendNotifications',
    async (data, thunkAPI) => {

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

            const response = await api.post(`/api/v1/notifications/send`, data, config)

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(error.message);
        }
    }
)
