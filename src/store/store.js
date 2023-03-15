import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { apiSlice } from '../features/auth/auth-api-slice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  }
});

setupListeners(store.dispatch);

// export type AppDispatch = typeof store.dispatch;
