import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HttpClient } from '../../service/httpService';
import { saveState } from '../../utils/localStorage';

const initialState = {
  message: null,
  status: 'idle',
  error: null
};

export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async (credentials) => {
    const client = new HttpClient(credentials);

    try {
      const response = await client.getLogin();
      return response.data;
    } catch (error) {
      // console.log('error:', error);
      return error.response.data;
    }
  }
);

export const fetchSignin = createAsyncThunk(
  'auth/fetchSignin',
  async (credentials) => {
    const client = new HttpClient(credentials);
    try {
      const response = await client.getSignup(credentials);
      return response.data;
    } catch (error) {
      // console.log('error:', error);
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

    builder.addCase(fetchSignin.fulfilled, (state, action) => {
      console.log('action:', action);
      return action.payload;
    });
  }
});

export default authSlice.reducer;
