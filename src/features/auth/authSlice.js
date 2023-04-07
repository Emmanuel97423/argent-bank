import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HttpClient } from '../../service/httpService';
import { deleteState } from '../../utils/localStorage';
import { deleteStateToSessionStorage } from '../../utils/sessionStorage';

const initialState = {
  user: null,
  token: null,
  remenberMe: false,
  isLogined: false
};

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
        state.isLogined = true;
      }
    },
    remenberMe: {
      reducer(state, action) {
        state.remenberMe = action.payload;
      }
    },
    logout: {
      reducer(state) {
        deleteState('auth');
        deleteStateToSessionStorage('auth');
        state.user = null;
        state.token = null;
        state.isLogined = false;
        state.remenberMe = false;
      }
    }
  },
  extraReducers: {}
});

export const { setToken, setUser, remenberMe, logout } = authSlice.actions;
export default authSlice.reducer;
