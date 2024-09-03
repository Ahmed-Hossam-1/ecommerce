import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "universal-cookie";
import { createAddressReq, updateAddressReq } from "../../../types/api";
import { Address } from "../../../types/type";

export const addressSlice = createApi({
  reducerPath: "addressApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  tagTypes: ["Address"],
  endpoints: (builder) => ({
    getAddressByUserId: builder.query<{ address: Address }, void>({
      query: () => {
        const cookies = new Cookies(null, { path: "/" });
        const token = cookies.get("token");
        return {
          url: "/api/address",
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["Address"],
    }),
    addAddress: builder.mutation<{ message: string }, createAddressReq>({
      query: (address) => {
        const cookies = new Cookies(null, { path: "/" });
        const token = cookies.get("token");
        return {
          url: "/api/address/create",
          method: "POST",
          body: address,
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["Address"],
    }),
    updateAddress: builder.mutation<{ message: string }, updateAddressReq>({
      query: (address) => {
        const cookies = new Cookies(null, { path: "/" });
        const token = cookies.get("token");
        return {
          url: `/api/address/${address.id}`,
          method: "PUT",
          body: address,
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["Address"],
    }),
  }),
});

export const {
  useGetAddressByUserIdQuery,
  useAddAddressMutation,
  useUpdateAddressMutation,
} = addressSlice;
