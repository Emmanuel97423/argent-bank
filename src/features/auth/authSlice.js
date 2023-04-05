import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { fetchProfile } from '../profile/profileSlice';
import { HttpClient } from '../../service/httpService';
// import {
//   saveState,
//   saveToken,
//   saveUserState,
//   loadState
// } from '../../utils/localStorage';

const initialState = { user: null, token: null, status: null, message: '' };

export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async (credentials) => {
    console.log('credentials:', credentials);
    const client = new HttpClient(credentials);
    const response = await client.getLogin();
    return response.data;
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
  reducers: {
    setCredentials(state, action) {
      // state.user = action.payload;
      console.log(' action.payload:', action.payload);
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchLogin.fulfilled, (state, action) => {
      console.log('action:', action.payload);
      const status = action.payload.status;

      if (status === 200) {
        const token = action.payload.body.token;
        state.token = token;
      }

      return action.payload;
    });

    builder.addCase(fetchLogin.rejected, (state, action) => {
      console.log('action:', action);
      state.status = 'rejected';
    });

    builder.addCase(fetchSignin.fulfilled, (state, action) => {
      return action.payload;
    });
  }
});

export const { setCredentials } = authSlice.actions;
export default authSlice.reducer;
