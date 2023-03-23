import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { fetchProfile } from '../profile/profileSlice';
import { HttpClient } from '../../service/httpService';
import { saveState, saveToken, saveUserState } from '../../utils/localStorage';

const initialState = [];

export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async (credentials) => {
    const client = new HttpClient(credentials);

    try {
      const response = await client.getLogin();
      return response.data;
    } catch (error) {
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

export const fetchProfile = createAsyncThunk(
  'auth/fetchProfile',
  async (token) => {
    const client = new HttpClient(token);

    try {
      const response = await client.getProfile();

      return response.data;
    } catch (error) {
      console.log('error:', error);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      const status = action.payload.status;
      if (status === 200) {
        const token = action.payload.body.token;
        saveToken(state, 'token', token);
      }

      return action.payload;
    });
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      const profile = action.payload.body;
      saveUserState(state, 'user', profile);
    });

    builder.addCase(fetchSignin.fulfilled, (state, action) => {
      return action.payload;
    });
  }
});

export default authSlice.reducer;
