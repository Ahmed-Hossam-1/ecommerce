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
  }),
});
export const { useGetAllUsersQuery } = userSlice;
