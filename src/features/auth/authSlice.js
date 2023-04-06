import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HttpClient } from '../../service/httpService';

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

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: {
      reducer(state, action) {
        state.token = action.payload;
      }
    }
  },
  extraReducers: {}
});

export const { setToken } = authSlice.actions;
export default authSlice.reducer;
