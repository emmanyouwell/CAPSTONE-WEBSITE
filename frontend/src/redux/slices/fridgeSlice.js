import { createSlice } from '@reduxjs/toolkit';
import { 
  addFridges, 
  deleteFridges,
  getFridgeDetails, 
  getFridges, 
  openFridge, 
  
  updateFridge
} from '../actions/fridgeActions';

export const fridgeSlice = createSlice({
  name: 'fridge',
  initialState: {
    fridges: [],
    available: 0,
    loading: false, // Useful for async actions like login/signup
    error: null, // To handle errors
    fridgeDetails: {},
    fridgeContent: [],
    allBags: [],
    isUpdated: false,
    isDeleted: false,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      
      .addCase(getFridges.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getFridges.fulfilled, (state, action) => {
        state.loading = false;
        state.fridges = action.payload.fridges;
        state.available = action.payload.availableMilk;
      })
      .addCase(getFridges.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; 
      })

      .addCase(addFridges.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addFridges.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.success;
      })
      .addCase(addFridges.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

       .addCase(updateFridge.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(updateFridge.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = action.payload.success;
      })
      .addCase(updateFridge.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getFridgeDetails.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getFridgeDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.fridgeDetails = action.payload.fridge;
      })
      .addCase(getFridgeDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })

      .addCase(deleteFridges.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(deleteFridges.fulfilled, (state, action) => {
        state.loading = false;
        state.isDeleted = action.payload.success;
      })
      .addCase(deleteFridges.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(openFridge.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(openFridge.fulfilled, (state, action) => {
        state.loading = false;
        state.fridgeContent = action.payload.inventories;
        state.allBags = action.payload.allBags || [];
      })
      .addCase(openFridge.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      
  },
});

export default fridgeSlice.reducer;
