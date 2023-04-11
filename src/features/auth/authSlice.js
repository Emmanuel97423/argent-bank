import { createSlice } from '@reduxjs/toolkit';
import { deleteState } from '../../utils/localStorage';
import { deleteStateToSessionStorage } from '../../utils/sessionStorage';

/**
 * Initial state for the authentication slice
 * @typedef {Object} AuthState
 * @property {Object} user - The authenticated user object
 * @property {string} token - The authentication token
 * @property {boolean} remenberMe - Whether to remember the user's login state
 * @property {boolean} isLogined - Whether the user is currently logged in
 */

/** @type {AuthState} */
const initialState = {
  user: null,
  token: null,
  remenberMe: false,
  isLogined: false
};

/**
 * Redux toolkit slice for authentication
 * @type {import("@reduxjs/toolkit").Slice<AuthState, { setToken(state: AuthState, action: { payload: string; }): void; setUser(state: AuthState, action: { payload: Object; }): void; remenberMe(state: AuthState, action: { payload: boolean; }): void; updateUser(state: AuthState, action: { payload: Object; }): void; logout(state: AuthState): void; }, "auth">}
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Sets the authentication token
     * @param {AuthState} state - The current authentication state
     * @param {{ payload: string }} action - The action containing the token payload
     */
    setToken: {
      reducer(state, action) {
        state.token = action.payload;
      }
    },

    /**
     * Sets the authenticated user object
     * @param {AuthState} state - The current authentication state
     * @param {{ payload: Object }} action - The action containing the user payload
     */
    setUser: {
      reducer(state, action) {
        state.user = action.payload;
        state.isLogined = true;
      }
    },

    /**
     * Sets the "remember me" option
     * @param {AuthState} state - The current authentication state
     * @param {{ payload: boolean }} action - The action containing the "remember me" payload
     */
    remenberMe: {
      reducer(state, action) {
        state.remenberMe = action.payload;
      }
    },

    /**
     * Updates the authenticated user object
     * @param {AuthState} state - The current authentication state
     * @param {{ payload: Object }} action - The action containing the updated user payload
     */
    updateUser: {
      reducer(state, action) {
        state.user = action.payload;
      }
    },

    /**
     * Logs out the user
     * @param {AuthState} state - The current authentication state
     */
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

export const { setToken, setUser, remenberMe, logout, updateUser } =
  authSlice.actions;
export default authSlice.reducer;
