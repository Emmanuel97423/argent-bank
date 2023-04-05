import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }),
  preparedHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    console.log('token:', token);
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
  endpoints: (builder) => ({
    fetchLogin: builder.mutation({
      query: (credentials) => ({
        url: '/login',
        method: 'POST',
        body: credentials
      })
    }),
    protected: builder.mutation({
      query: () => 'protected'
    })
  })
});

export const { useFetchLoginMutation } = apiSlice;
