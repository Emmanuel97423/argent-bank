import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HttpClient } from '../../service/httpService';

const initialState = {};

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (token) => {
    const client = new HttpClient(token);

    try {
      const response = await client.getProfile();
      console.log('response:', response.data);

      return response.data;
    } catch (error) {
      console.log('error:', error);
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProfile.fulfilled, (state, action) => {
      return action.payload;
    });
  }
});

export default profileSlice.reducer;
