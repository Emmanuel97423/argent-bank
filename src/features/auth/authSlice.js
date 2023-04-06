import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HttpClient } from '../../service/httpService';

const initialState = { user: null, token: null, remenberMe: true };

export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async (credentials) => {
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
    },
    setUser: {
      reducer(state, action) {
        state.user = action.payload;
      }
    },
    remenberMe: {
      reducer(state, action) {
        state.remenberMe = action.payload;
      }
    }
  },
  extraReducers: {}
});

export const { setToken, setUser, remenberMe } = authSlice.actions;
export default authSlice.reducer;
