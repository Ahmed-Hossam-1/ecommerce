import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../../types/type";
import Cookies from "universal-cookie";

interface GetUserResponse {
  users: User[];
}

export const userSlice = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getAllUsers: builder.query<GetUserResponse, void>({
      query: () => "/api/user",
      providesTags: ["Users"],
    }),
    getUserById: builder.query<{ user: User }, string>({
      query: (id) => `/api/user/${id}`,
    }),
    createUser: builder.mutation<{ message: string }, User>({
      query: (body) => ({
        url: "/api/user",
        method: "POST",
        body: {
          name: body.name,
          email: body.email,
          password: body.password,
          role: body.role,
        },
      }),
      invalidatesTags: ["Users"],
    }),
    updateUser: builder.mutation<{ message: string }, User>({
      query: (body) => ({
        url: `/api/user/${body.id}`,
        method: "PUT",
        body: {
          name: body.name,
          email: body.email,
          role: body.role,
        },
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation<{ message: string }, { id: string }>({
      query: (id) => ({
        url: `/api/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
    currentUser: builder.query<{ user: User }, void>({
      query: () => {
        const cookies = new Cookies(null, { path: "/" });
        const token = cookies.get("token");
        return {
          url: "/api/user/currentuser",
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["Users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useCurrentUserQuery,
} = userSlice;
