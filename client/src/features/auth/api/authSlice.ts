import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

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
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    signupUser: builder.mutation({
      query: ({ name, email, password }: signupArg) => ({
        url: "/api/auth/signup",
        method: "POST",
        body: { name, email, password },
      }),
      invalidatesTags: ["Auth"],
    }),
    signinUser: builder.mutation({
      query: ({ email, password }: signinArg) => ({
        url: "/api/auth/signin",
        method: "POST",
        body: { email, password },
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});
export const { useSigninUserMutation, useSignupUserMutation } = authSlice;
