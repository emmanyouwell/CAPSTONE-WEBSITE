import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../api/axiosInstance'

const VITE_APP_URL = import.meta.env.VITE_APP_URL;
export const getMilkPerMonth = createAsyncThunk(
    'milkPerMonth/getMilkPerMonth',
    async (thunkAPI) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        }

        try {
            const response = await api.get(`${VITE_APP_URL}/api/v1/milkPerMonth`, config)

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const getDonorsPerMonth = createAsyncThunk(
    'donorsPerMonth/getDonorsPerMonth',
    async (thunkAPI) => {

       
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        }

        try {
            const response = await api.get(`${VITE_APP_URL}/api/v1/donorsPerMonth`, config)

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const getDispensedMilkPerMonth = createAsyncThunk(
    'donorsPerMonth/getDispensedMilkPerMonth',
    async (thunkAPI) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        }

        try {
            const response = await api.get(`${VITE_APP_URL}/api/v1/dispensePerMonth`, config)

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const getPatientsPerMonth = createAsyncThunk(
    'donorsPerMonth/getPatientsPerMonth',
    async (thunkAPI) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        }

        try {
            const response = await api.get(`${VITE_APP_URL}/api/v1/patientsPerMonth`, config)

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const getRequestsPerMonth = createAsyncThunk(
    'donorsPerMonth/getRequestsPerMonth',
    async (thunkAPI) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        }

        try {
            const response = await api.get(`${VITE_APP_URL}/api/v1/requestsPerMonth`, config)

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const getAvailableMilk = createAsyncThunk(
    'donorsPerMonth/getAvailableMilk',
    async (thunkAPI) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        }

        try {
            const response = await api.get(`${VITE_APP_URL}/api/v1/availableMilk`, config)

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const getExpiringMilk = createAsyncThunk(
    'donorsPerMonth/getExpiringMilk',
    async (thunkAPI) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        }

        try {
            const response = await api.get(`${VITE_APP_URL}/api/v1/expiringMilk`, config)

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(error.message);
        }
    }
)


export const getVolumePerLocation = createAsyncThunk(
    'donorsPerMonth/getVolumePerLocation',
    async (thunkAPI) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        }

        try {
            const response = await api.get(`${VITE_APP_URL}/api/v1/donationLocation`, config)

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(error.message);
        }
    }
)

export const getDonorLocation = createAsyncThunk(
    'donorsPerMonth/getDonorLocation',
    async (thunkAPI) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        }

        try {
            const response = await api.get(`${VITE_APP_URL}/api/v1/donorLocation`, config)

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(error.message);
        }
    }
)


export const getPatientHospital = createAsyncThunk(
    'donorsPerMonth/getPatientHospital',
    async (thunkAPI) => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        }

        try {
            const response = await api.get(`${VITE_APP_URL}/api/v1/patientHospital`, config)

            return response.data;

        } catch (error) {

            return thunkAPI.rejectWithValue(error.message);
        }
    }
)