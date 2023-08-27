import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const login = createAsyncThunk("auth/login", async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
        const response = await api.signIn(formValue);
        toast.success("Login succesfully");
        navigate("/");
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: "",
    loading: false,
  },
  extraReducers: {
    [login.pending]: (state, action) => {
        state.loading = true;
        state.error = "";
    },
    [login.fulfilled]: (state, action) => {
        state.loading = false;
        localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
        state.user = action.payload;
        state.error = "";
    },
    [login.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
    }
  }
});

export default authSlice.reducer;
