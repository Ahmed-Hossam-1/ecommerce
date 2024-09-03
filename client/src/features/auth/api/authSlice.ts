import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { signinArg, signupArg } from "../../../types/type";

export const authSlice = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    signupUser: builder.mutation<void, signupArg>({
      query: ({ name, email, password }) => ({
        url: "/api/auth/signup",
        method: "POST",
        body: { name, email, password },
      }),
      invalidatesTags: ["Auth"],
    }),
    signinUser: builder.mutation<void, signinArg>({
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
