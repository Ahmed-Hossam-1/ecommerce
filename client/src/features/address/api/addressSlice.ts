import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "universal-cookie";

interface createAddressReq {
  id?: string;
  street: string;
  city: string;
  state: string;
  country: string;
  phone: string;
}

// interface address {
//   id: string;
//   userId: string;
//   street: string;
//   city: string;
//   state: string;
//   country: string;
//   phone: string;
// }

export const addressSlice = createApi({
  reducerPath: "addressApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  tagTypes: ["Address"],
  endpoints: (builder) => ({
    getAddressByUserId: builder.query({
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
    addAddress: builder.mutation<void, createAddressReq>({
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
    updateAddress: builder.mutation<void, createAddressReq>({
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
