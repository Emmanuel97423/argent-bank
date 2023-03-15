import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://argent-bank-api-production.up.railway.app'
    // prepareHeaders(headers){
    //     headers.set('x-')
    //     return headers
    // }
  }),
  endpoints(builder) {
    return {
      fetchAuth: builder.mutation({
        query: (payload) => ({
          url: '/user/login',
          method: 'POST',
          body: payload,
          headers: {
            'Content-Type': 'application/json ; charset=UTF-8'
          }
        }),
        invalidatesTags: ['Auth']
      })
    };
  }
});

export const { useFetchAuthMutation } = apiSlice;
