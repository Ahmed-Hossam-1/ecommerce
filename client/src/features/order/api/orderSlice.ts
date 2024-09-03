import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createOrderRequest } from "../../types/api";
import { Order } from "../../types/type";
import Cookies from "universal-cookie";

export const orderSlice = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    createOrder: builder.mutation<{ message: string }, createOrderRequest>({
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
    getOrderByUserId: builder.query<{ orders: Order[] }, void>({
      query: () => {
        const cookies = new Cookies(null, { path: "/" });
        const token = cookies.get("token");

        return {
          url: `/api/order/get-order`,
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

export const { useCreateOrderMutation, useGetOrderByUserIdQuery } = orderSlice;
