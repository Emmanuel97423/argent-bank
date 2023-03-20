import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { saveState } from '../../utils/localStorage';

const initialState = {
  message: null,
  status: 'idle',
  error: null
};

const authUserMock = '';

export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async (credentials) => {
    try {
      const response = await axios.post(
        'http://localhost:3001/api/v1/user/login',
        credentials
      );

      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchLogin.pending, (state, action) => {
      state.status = 'Loading';
    });
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      saveState(action.payload);
      return action.payload;
    });
    builder.addCase(fetchLogin.rejected, (state, action) => {
      state.status = 'Rejected';
      state.error = action.error.message;
    });
  }
});

export default authSlice.reducer;
