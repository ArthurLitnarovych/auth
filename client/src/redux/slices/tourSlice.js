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

export const getTours = createAsyncThunk(
  "tour/getTours",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getTours();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getToursByUser = createAsyncThunk(
  "tour/getToursByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await api.getToursByUser(userId);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getTour = createAsyncThunk(
  "tour/getTour",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.getTour(id);
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
      })
      .addCase(getTours.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getTours.fulfilled, (state, action) => {
        state.loading = false;
        state.tours = action.payload;
        state.error = "";
      })
      .addCase(getTours.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getTour.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getTour.fulfilled, (state, action) => {
        state.loading = false;
        state.tour = action.payload;
        state.error = "";
      })
      .addCase(getTour.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getToursByUser.pending, (state, action) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getToursByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userTours = action.payload;
        state.error = "";
      })
      .addCase(getToursByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default tourSlice.reducer;
