import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/**
 * The API slice created using `createApi` from the "@reduxjs/toolkit/query/react" package.
 */
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

  /**
   * The endpoints provided by the API.
   */
  endpoints: (builder) => ({
    /**
     * Fetches the login credentials of the user.
     */
    fetchLogin: builder.mutation({
      query: (credentials) => ({
        url: 'user/login',
        method: 'POST',
        body: credentials
      })
    }),

    /**
     * Fetches the profile information of the user.
     */
    fetchUser: builder.mutation({
      query: () => ({
        url: 'user/profile',
        method: 'POST'
      })
    }),

    /**
     * Updates the name of the user.
     *
     * @param {object} body - The updated name of the user.
     */
    updateUserNames: builder.mutation({
      query: (body) => ({
        url: 'user/profile',
        method: 'PUT',
        body: body
      })
    }),

    /**
     * Fetches a protected resource.
     */
    protected: builder.mutation({
      query: () => 'protected'
    })
  })
});

/**
 * The generated hooks for the API endpoints.
 */
export const {
  useFetchLoginMutation,
  useFetchUserMutation,
  useUpdateUserNamesMutation
} = apiSlice;
