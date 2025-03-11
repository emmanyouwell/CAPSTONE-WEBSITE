import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { authenticate, getToken, logout } from '../../utils/helper';

const VITE_APP_URL = import.meta.env.VITE_APP_URL;

// Get All Inventory
export const getInventories = createAsyncThunk(
    'inventory/getInventory',
    async (query, thunkAPI) => {
        
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
            let urlString = ''
            if (query){
                urlString = `${VITE_APP_URL}/api/v1/inventories?search=${query}`
            }
            else {
                urlString = `${VITE_APP_URL}/api/v1/inventories`
            }
            const response = await axios.get(urlString, config);
            return response.data;

        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

// Add inventory 
export const addInventory = createAsyncThunk(
    'inventory/addInventory',
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

            const response = await axios.post(`${VITE_APP_URL}/api/v1/inventories`, req, config)

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

// Update inventory
export const updateInventory = createAsyncThunk(
    'inventory/updateInventory',
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
            const response = await axios.put(`${VITE_APP_URL}/api/v1/inventory/${req.id}`, req, config)
            console.log("Updated Inventory: ", req.id)
            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

// Delete inventory
export const deleteInventory = createAsyncThunk(
    'inventory/deleteInventory',
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
            const response = await axios.delete(`${VITE_APP_URL}/api/v1/inventory/${id}`, config)

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

// Get inventory Details
export const getInventoryDetails = createAsyncThunk(
    'inventory/getInventoryDetails',
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

            const response = await axios.get(`${VITE_APP_URL}/api/v1/inventory/${id}`, config)
            console.log("Response: ", response.data)
            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(error.message);
        }
    }
)
