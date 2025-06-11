import { createAsyncThunk } from '@reduxjs/toolkit';

const VITE_APP_URL = import.meta.env.VITE_APP_URL;
import api from '../../api/axiosInstance';
export const getAnnouncement = createAsyncThunk(
    'article/getAnnouncement',
    async (query, thunkAPI) => {
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                
            },
            withCredentials: true
        }
        try {
            let urlString = ''
            if (query) {
                urlString = `${VITE_APP_URL}/api/v1/announcements?search=${query}`
            }
            else {
                urlString = `${VITE_APP_URL}/api/v1/announcements`
            }
            const response = await axios.get(urlString, config);
            console.log("Response", response.data)
            console.log("URL: ", urlString)
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const addAnnouncements = createAsyncThunk(
    'article/addAnnouncements',
    async (req, thunkAPI) => {

        
        const config = {
            headers: {

                
            },
            withCredentials: true
        }
        try {
            console.log("sending request");

            const response = await api.post(`${VITE_APP_URL}/api/v1/announcements`, req, config);
            console.log("response: ", response);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const updateAnnouncements = createAsyncThunk(
    'article/updateAnnouncements',
    async (req, thunkAPI) => {
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                
            },
            withCredentials: true
        }
        try {
            const response = await api.put(`${VITE_APP_URL}/api/v1/announcement/${req.id}`, req, config);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const deleteAnnouncement = createAsyncThunk(
    'article/deleteAnnouncement',
    async (id, thunkAPI) => {
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                
            },
            withCredentials: true
        }
        try {
            const response = await api.delete(`${VITE_APP_URL}/api/v1/announcement/${id}`, config);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const getAnnouncementDetails = createAsyncThunk(
    'article/getAnnouncementDetails',
    async (id, thunkAPI) => {
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                
            },
            withCredentials: true
        }
        try {
            const response = await api.get(`${VITE_APP_URL}/api/v1/announcement/${id}`, config);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)


export const addHTMLAnnouncements = createAsyncThunk(
    'article/addHTMLAnnouncements',
    async (req, thunkAPI) => {

        
        const config = {
            headers: {

                
            },
            withCredentials: true
        }
        try {

            const response = await api.post(`${VITE_APP_URL}/api/v1/html-announcement`, req, config);
            console.log("response: ", response.data);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)


export const updateHTMLAnnouncement = createAsyncThunk(
    'article/updateHTMLAnnouncement',
    async (req, thunkAPI) => {
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                
            },
            withCredentials: true
        }
        try {
            const response = await api.put(`${VITE_APP_URL}/api/v1/html-announcement/${req.id}`, req, config);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)
