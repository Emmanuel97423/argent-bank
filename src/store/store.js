import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { apiSlice } from '../features/api/apiSlice';
import { saveState, loadState } from '../utils/localStorage';
import {
  saveStateToSessionStorage,
  loadStateToSessionStorage
} from '../utils/sessionStorage';
import throttle from 'lodash.throttle';

let persistedState;

const stateFromLocalStorage = loadState('auth');
const stateFromSessionStorage = loadStateToSessionStorage('auth');
if (stateFromLocalStorage) {
  persistedState = stateFromLocalStorage;
} else if (stateFromSessionStorage) {
  persistedState = stateFromSessionStorage;
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  preloadedState: persistedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware)
});

store.subscribe(
  throttle(() => {
    const { auth } = store.getState();
    if (auth.remenberMe === false) {
      saveStateToSessionStorage({ auth });
      return;
    } else {
      saveState({ auth });
    }
  }, 1000)
);
