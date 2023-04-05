import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import authReducer from '../features/auth/authSlice';
import profileReducer from '../features/profile/profileSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import { apiSlice } from '../features/api/apiSlice';
// And use redux-batched-subscribe as an example of adding enhancers

// convert object to string and store in localStorage
// function saveToLocalStorage(state) {
//   try {
//     const serialisedState = JSON.stringify(state);
//     localStorage.setItem('persistantState', serialisedState);
//   } catch (e) {
//     console.warn(e);
//   }
// }

// load string from localStarage and convert into an Object
// invalid output must be undefined
// function loadFromLocalStorage() {
//   try {
//     const serialisedState = localStorage.getItem('persistantState');
//     if (serialisedState === null) return undefined;
//     return JSON.parse(serialisedState);
//   } catch (e) {
//     console.warn(e);
//     return undefined;
//   }
// }

// const store = configureStore(
//   {
//     reducer: { auth: authReducer, profile: profileReducer }
//   },
//   loadFromLocalStorage()
// );
const rootPersistConfig = {
  key: 'root',
  storage: storage
  // blacklist: ['auth']
};

const authPersistConfig = {
  key: 'auth',
  storage: storage,
  blacklist: ['profile']
};
const profilePersistConfig = {
  key: 'profile',
  storage: storage,
  blacklist: ['auth']
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  profile: persistReducer(profilePersistConfig, profileReducer)
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);
// const apiSliceMiddleware = (getDefaultMiddleware) =>
//   getDefaultMiddleware().concat(apiSlice.middleware);

export const store = configureStore({
  reducer: { persistedReducer, [apiSlice.reducerPath]: apiSlice.reducer },
  middleware: [thunk, apiSlice.middleware]
  // enhancers: [batchedSubscribe(saveToLocalStorage)]
});

export const persistor = persistStore(store);

// listen for store changes and use saveToLocalStorage to
// save them to localStorage
// store.subscribe(() => saveToLocalStorage(store.getState()));

// export default store;
