import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { apiSlice } from '../features/api/apiSlice';
import { saveState, loadState } from '../utils/localStorage';
import throttle from 'lodash.throttle';
import { useSelector } from 'react-redux';

const persistedState = loadState('auth');
// const { remenberMe } = useSelector((state) => state.auth);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    preloadedState: persistedState,
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware)
});

store.subscribe(
  throttle(() => {
    const { auth } = store.getState();
    console.log('auth:', auth);
    if (auth.remenberMe === false) {
      return;
    } else {
      saveState({ auth });
    }
  }, 1000)
);
