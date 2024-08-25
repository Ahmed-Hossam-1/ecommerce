import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface SellerReq {
  id: string;
  userId: string;
  name: string;
  email: string;
  status: "pending" | "approved" | "rejected";
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
  reducerPath: "sellerReqApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  tagTypes: ["seller_req"],
  endpoints: (builder) => ({
    getAllSellerReq: builder.query<GetSellerReqResponse, void>({
      query: () => "/api/seller_req",
      providesTags: ["seller_req"],
    }),
    sendSellerReq: builder.mutation<sendSellerReq, sendSellerReq>({
      query: (sellerReq) => ({
        url: "/api/seller_req/create",
        method: "POST",
        body: sellerReq,
      }),
      invalidatesTags: ["seller_req"],
    }),
    updateSellerReq: builder.mutation<
      { message: string },
      { id: string; status: "approved" | "rejected" }
    >({
      query: ({ id, status }) => ({
        url: `/api/seller_req/update/${id}`,
        method: "POST",
        body: { status },
      }),
      invalidatesTags: ["seller_req"],
    }),
  }),
});

export const {
  useGetAllSellerReqQuery,
  useSendSellerReqMutation,
  useUpdateSellerReqMutation,
} = seller_reqSlice;
