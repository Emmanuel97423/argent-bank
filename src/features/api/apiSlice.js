import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/v1' }),
  tagTypes: ['Auth'],
  preparedHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
  endpoints: (builder) => ({
    fetchLogin: builder.mutation({
      query: (credentials) => ({
        url: 'user/login',
        method: 'POST',
        body: credentials
      })
    }),
    fetchUser: builder.mutation({
      query: () => ({
        url: 'user/profile',
        method: 'POST'
      })
    }),
    protected: builder.mutation({
      query: () => 'protected'
    })
  })
});

export const { useFetchLoginMutation, useFetchUserMutation } = apiSlice;
