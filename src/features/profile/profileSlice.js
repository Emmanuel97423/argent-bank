import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HttpClient } from '../../service/httpService';
import { saveUserState } from '../../utils/localStorage';

const initialState = {
  profile: {},
  isLoggedIn: false
};

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (token) => {
    console.log('token:', token);
    const client = new HttpClient(token);

    try {
      const response = await client.getProfile();

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
      // saveUserState(state, 'user', action.payload);
      state.profile = action.payload.body;
      state.isLoggedIn = true;

      // return action.payload;
    });
  }
});

export default profileSlice.reducer;

export const selectedProfile = (state) => state.profile.body;
