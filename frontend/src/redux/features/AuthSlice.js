import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import authAxios from '../../axios'

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ userName, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/user/login`,
        { userName, password }
      );
      const { token } = response.data;
      localStorage.setItem("token", token);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "auth/updateProfile",
  async (updatedProfileData, { rejectWithValue }) => {
    try {
      const response = await authAxios.post(
        `${import.meta.env.VITE_APP_API_URL}/user/edit-profile`,
        updatedProfileData
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const getMe = createAsyncThunk(
  "auth/getMe",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_URL}/user/me`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  isAuthenticated: !!localStorage.getItem("token"),
  user: null,
  loading: false,
  error: null,
  userProfileLoading: false,
  userProfileError: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem("token");
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      .addCase(getMe.pending, (state) => {
        state.userProfileLoading = true;
        state.userProfileError = null;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.userProfileLoading = false;
        state.user = action.payload;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.userProfileLoading = false;
        state.userProfileError = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.userProfileLoading = true;
        state.userProfileError = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.userProfileLoading = false;
        // Update user profile data
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.userProfileLoading = false;
        state.userProfileError = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
