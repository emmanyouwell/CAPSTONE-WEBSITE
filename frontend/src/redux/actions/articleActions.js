import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { authenticate, getToken, logout } from '../../utils/helper';
const VITE_APP_URL = import.meta.env.VITE_APP_URL;

export const getArticles = createAsyncThunk(
    'article/getArticles',
    async(query, thunkAPI) => {
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
            let urlString = ''
            if (query){
                urlString = `${VITE_APP_URL}/api/v1/articles?search=${query}`
            }
            else {
                urlString = `${VITE_APP_URL}/api/v1/articles`
            }
            const response = await axios.get(urlString, config);
            return response.data;
        }catch (error){
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const addArticles = createAsyncThunk(
    'article/addArticles',
    async(req, thunkAPI) => {
        
        const token = await getToken();
        if (!token) {
            throw new Error('No token available');
        }
        const config = {
            headers: {
                
                Authorization: `Bearer ${token}`
            },
            withCredentials: true
        }
        try {
            console.log("sending request");
            console.log(`${VITE_APP_URL}/api/v1/articles`)
            const response = await axios.post(`${VITE_APP_URL}/api/v1/articles`, req, config);
            console.log("response: ", response);
            return response.data;
        }catch (error){
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const updateArticle = createAsyncThunk(
    'article/updateArticle',
    async(req, thunkAPI) => {
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
            const response = await axios.put(`${VITE_APP_URL}/api/v1/articles/${req.id}`, req, config);
            return response.data;
        }catch (error){
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const deleteArticle = createAsyncThunk(
    'article/deleteArticle',
    async(id, thunkAPI) => {
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
            const response = await axios.delete(`${VITE_APP_URL}/api/v1/articles/${id}`, config);
            return response.data;
        }catch (error){
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const getArticleDetails = createAsyncThunk(
    'article/getArticleDetails',
    async(id, thunkAPI) => {
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
            const response = await axios.get(`${VITE_APP_URL}/api/v1/article/${id}`, config);
            return response.data;
        }catch (error){
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)