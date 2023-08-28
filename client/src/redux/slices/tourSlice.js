import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const createTour = createAsyncThunk(
  "tour/createTour",
  async ({ updatedTourData, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.createTour(updatedTourData);
      toast.success("Tour added succesfully");
      navigate("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const tourSlice = createSlice({
  name: "tour",
  initialState: {
    tour: {},
    tours: [],
    userTours: [],
    error: "",
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTour.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(createTour.fulfilled, (state, action) => {
        state.loading = false;
        state.tours = [action.payload];
        state.error = "";
      })
      .addCase(createTour.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default tourSlice.reducer;
