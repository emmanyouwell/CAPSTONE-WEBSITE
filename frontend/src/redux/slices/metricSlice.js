import { createSlice } from '@reduxjs/toolkit';
import { getMilkPerMonth, getDonorsPerMonth, getDispensedMilkPerMonth, getPatientsPerMonth, getVolumePerLocation, getRequestsPerMonth, getDonorLocation, getPatientHospital } from '../actions/metricActions';
import { getAvailableMilk } from '../actions/metricActions';
import { getExpiringMilk } from '../actions/metricActions';
export const metricSlice = createSlice({
    name: 'metric',
    initialState: {
        loading: false,
        error: null,
        stats: {},
        available: 0,
        expiring: 0,
        volumePerLocation: {},
        donorLocation: {},
        monthlyDonors: {},
        dispensedMilk: {},
        monthlyPatients: {},
        monthlyRequests: {},
        patientHospital: {},
    },
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMilkPerMonth.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getMilkPerMonth.fulfilled, (state, action) => {
                state.loading = false;
                state.stats = action.payload.stats;
            })
            .addCase(getMilkPerMonth.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getDonorsPerMonth.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getDonorsPerMonth.fulfilled, (state, action) => {
                state.loading = false;
                state.monthlyDonors = action.payload.result;
            })
            .addCase(getDonorsPerMonth.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getDispensedMilkPerMonth.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getDispensedMilkPerMonth.fulfilled, (state, action) => {
                state.loading = false;
                state.dispensedMilk = action.payload.dispensedMilk;
            })
            .addCase(getDispensedMilkPerMonth.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getPatientsPerMonth.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getPatientsPerMonth.fulfilled, (state, action) => {
                state.loading = false;
                state.monthlyPatients = action.payload.recipients;
            })
            .addCase(getPatientsPerMonth.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getRequestsPerMonth.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getRequestsPerMonth.fulfilled, (state, action) => {
                state.loading = false;
                state.monthlyRequests = action.payload.requests;
            })
            .addCase(getRequestsPerMonth.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getAvailableMilk.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getAvailableMilk.fulfilled, (state, action) => {
                state.loading = false;
                state.available = action.payload.availableMilk;
            })
            .addCase(getAvailableMilk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getExpiringMilk.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getExpiringMilk.fulfilled, (state, action) => {
                state.loading = false;
                state.expiring = action.payload.expiringMilk;
            })
            .addCase(getExpiringMilk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getVolumePerLocation.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getVolumePerLocation.fulfilled, (state, action) => {
                state.loading = false;
                state.volumePerLocation = action.payload.volumePerLocation;
            })
            .addCase(getVolumePerLocation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getDonorLocation.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getDonorLocation.fulfilled, (state, action) => {
                state.loading = false;
                state.donorLocation = action.payload.donors;
            })
            .addCase(getDonorLocation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            .addCase(getPatientHospital.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(getPatientHospital.fulfilled, (state, action) => {
                state.loading = false;
                state.patientHospital = action.payload.hospitals;
            })
            .addCase(getPatientHospital.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    },
});

export default metricSlice.reducer;