import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/api/v1'
    // preparedHeaders: (headers, { getState }) => {
    //   const token = getState().auth.token;
    //   if (token) {
    //     headers.set('authorization', `Bearer ${token}`);
    //   }
    //   return headers;
    // }
  }),
  tagTypes: ['Auth'],

  endpoints: (builder) => ({
    fetchLogin: builder.mutation({
      query: (credentials) => ({
        url: 'user/login',
        method: 'POST',
        body: credentials
      })
    }),
    fetchUser: builder.mutation({
      query: (token) => ({
        url: 'user/profile',
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      })
    }),
    protected: builder.mutation({
      query: () => 'protected'
    })
  })
});

export const { useFetchLoginMutation, useFetchUserMutation } = apiSlice;
