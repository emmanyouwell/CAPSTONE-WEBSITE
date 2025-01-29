import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { authenticate, getToken, logout } from '../../utils/helper';
const VITE_APP_URL = import.meta.env.VITE_APP_URL;
// const VITE_APP_URL = 'http://localhost:4000';
export const getDonors = createAsyncThunk(
    'donor/getDonors',
    async ({ search="", page = 1, pageSize = 12, brgy="", type="" }, thunkAPI) => {
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
        };

        try {
            let urlString = `${VITE_APP_URL}/api/v1/donors?page=${page}&pageSize=${pageSize}`;
            if (search) {
                urlString += `&search=${encodeURIComponent(search)}`;
            }
            if (brgy){
                urlString += `&brgy=${encodeURIComponent(brgy)}`;
            }
            if (type){
                urlString += `&type=${encodeURIComponent(type)}`;
            }

            const response = await axios.get(urlString, config);

            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

// Update donor
export const updateDonor = createAsyncThunk(
    'donor/updateDonor',
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
            const response = await axios.put(`${VITE_APP_URL}/api/v1/donor/${req.id}`, req, config)

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const getSingleDonor = createAsyncThunk(
    'donor/getSingleDonor',
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
            const response = await axios.get(`${VITE_APP_URL}/api/v1/donor/${req}`, config)

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(error.message);
        }
    }
)