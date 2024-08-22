import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../auth/api/authSlice';
import { User } from '../../../types/type';

interface GetUserResponse {
  users: User[];
}

export const userSlice = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['Users'],
  endpoints: builder => ({
    getAllUsers: builder.query<GetUserResponse, void>({
      query: () => '/api/user',
      providesTags: ['Users'],
    }),
    createUser: builder.mutation<User, User>({
      query: body => ({
        url: '/api/user',
        method: 'POST',
        body: {
          name: body.name,
          email: body.email,
          password: body.password,
          role: body.role,
        },
      }),
      invalidatesTags: ['Users'],
    }),
    updateUser: builder.mutation<User, User>({
      query: body => ({
        url: `/api/user/${body.id}`,
        method: 'PUT',
        body: {
          name: body.name,
          email: body.email,
          password: body.password,
          role: body.role,
        },
      }),
      invalidatesTags: ['Users'],
    }),
    deleteUser: builder.mutation<User, void>({
      query: id => ({
        url: `/api/user/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userSlice;
