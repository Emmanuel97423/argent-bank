import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: {},
  status: 'idle',
  error: null
};

const authUserMock = {
  email: 'tony@stark.com',
  password: 'password123'
};

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async () => {
  try {
    const response = await axios.post(
      'https://argent-bank-api-production.up.railway.app/api/v1/user/login',
      authUserMock
    );
    return response.data;
  } catch (error) {
    console.log('error:', error);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state, action) => {
      state.status = 'Loading';
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.status = 'Rejected';
      state.error = action.error.message;
    });
  }
});

export default authSlice.reducer;
