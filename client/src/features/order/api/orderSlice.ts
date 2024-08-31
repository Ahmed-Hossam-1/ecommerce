import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "universal-cookie";

// export interface Order {
//   id: string;
//   userId: string;
//   totalAmount: number;
// }

// export interface OrderItem {
//   id: string;
//   orderId: string;
//   productId: string;
//   quantity: number;
//   price: number;
// }

export const orderSlice = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    createOrder: builder.mutation<
      void,
      {
        totalAmount: number;
        items: { productId: string; quantity: number; price: number }[];
      }
    >({
      query: (order) => {
        const cookies = new Cookies(null, { path: "/" });
        const token = cookies.get("token");

        return {
          url: "/api/order/create",
          method: "POST",
          body: order,
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

export const { useCreateOrderMutation } = orderSlice;
