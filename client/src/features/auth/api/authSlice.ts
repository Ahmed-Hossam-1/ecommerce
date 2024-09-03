import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { signinRequest, signupRequest } from "../../../types/api";

export const authSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    signupUser: builder.mutation<{ jwt: string }, signupRequest>({
      query: ({ name, email, password }) => ({
        url: "/api/auth/signup",
        method: "POST",
        body: { name, email, password },
      }),
      invalidatesTags: ["Auth"],
    }),
    signinUser: builder.mutation<{ jwt: string }, signinRequest>({
      query: ({ email, password }) => ({
        url: "/api/auth/signin",
        method: "POST",
        body: { email, password },
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});
export const { useSigninUserMutation, useSignupUserMutation } = authSlice;
