import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../../auth/api/authSlice';

interface SellerReq {
  id: string;
  userId: string;
  name: string;
  email: string;
  status: 'pending' | 'approved' | 'rejected';
}

interface GetSellerReqResponse {
  requests: SellerReq[];
}

interface sendSellerReq {
  name: string;
  email: string;
  password: string;
}

export const seller_reqSlice = createApi({
  reducerPath: 'sellerReqApi',
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  tagTypes: ['seller_req'],
  endpoints: builder => ({
    getAllSellerReq: builder.query<GetSellerReqResponse, void>({
      query: () => '/api/seller_req',
      providesTags: ['seller_req'],
    }),
    sendSellerReq: builder.mutation<sendSellerReq, void>({
      query: sellerReq => ({
        url: '/api/seller_req/create',
        method: 'POST',
        body: sellerReq,
      }),
      invalidatesTags: ['seller_req'],
    }),
  }),
});

export const { useGetAllSellerReqQuery, useSendSellerReqMutation } = seller_reqSlice;
