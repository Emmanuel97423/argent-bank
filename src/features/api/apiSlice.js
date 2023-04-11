import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/api/v1',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    }
  }),
  // tagTypes: ['Auth'],

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
    updateUserNames: builder.mutation({
      query: (body) => {
        console.log('body:', body);
        return {
          url: 'user/profile',
          method: 'PUT',
          body: body
        };
      }
    }),
    protected: builder.mutation({
      query: () => 'protected'
    })
  })
});

export const {
  useFetchLoginMutation,
  useFetchUserMutation,
  useUpdateUserNamesMutation
} = apiSlice;
