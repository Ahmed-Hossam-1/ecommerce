import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'http://localhost:5000';

interface signupArg {
  name: string;
  email: string;
  password: string;
}

interface signinArg {
  email: string;
  password: string;
}

export const authSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Users'],
  endpoints: builder => ({
    signupUser: builder.mutation({
      query: ({ name, email, password }: signupArg) => ({
        url: '/api/auth/signup',
        method: 'POST',
        body: { name, email, password },
      }),
      invalidatesTags: ['Users'],
    }),
    signinUser: builder.mutation({
      query: ({ email, password }: signinArg) => ({
        url: '/api/auth/signin',
        method: 'POST',
        body: { email, password },
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});
export const { useSigninUserMutation, useSignupUserMutation } = authSlice;
