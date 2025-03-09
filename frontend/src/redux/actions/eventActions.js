import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { authenticate, getToken, logout } from '../../utils/helper';
const VITE_APP_URL = import.meta.env.VITE_APP_URL;

export const getEvents = createAsyncThunk(
    'event/getEvents',
    async ({upcoming=false}, thunkAPI) => {
        
        const token = await getToken();
        console.log('Token Retrieved:', token);
        console.log("Getting events")
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
            let url = `${VITE_APP_URL}/api/v1/events`;
            if (upcoming){
                url += '/?upcoming=true'
            }
            console.log("url: ", url);
            const response = await axios.get(url, config)
            
            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(error.message);
        }
    }
)


export const addEvents = createAsyncThunk(
    'event/addEvents',
    async (req, thunkAPI) => {

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


            const response = await axios.post(`${VITE_APP_URL}/api/v1/events`, req, config)

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const editEvents = createAsyncThunk(
    'event/editEvents',
    async (req, thunkAPI) => {

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
            console.log("Request: ", req)
            const response = await axios.put(`${VITE_APP_URL}/api/v1/event/${req.get("id")}`, req, config)

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const deleteEvents = createAsyncThunk(
    'event/deleteEvents',
    async (id, thunkAPI) => {

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
            const response = await axios.delete(`${VITE_APP_URL}/api/v1/event/${id}`, config)

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const getEventDetails = createAsyncThunk(
    'event/getEventDetails',
    async (id, thunkAPI) => {

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

            const response = await axios.get(`${VITE_APP_URL}/api/v1/event/${id}`, config)
            
            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(error.message);
        }
    }
)