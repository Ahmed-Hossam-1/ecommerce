import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentSlice = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  tagTypes: ["Payment"],
  endpoints: (builder) => ({
    createPayment: builder.mutation<
      { clientSecret: string | null },
      { amount: number }
    >({
      query: ({ amount }) => ({
        url: "/api/payment/create",
        method: "POST",
        body: { amount },
      }),
      invalidatesTags: ["Payment"],
    }),
  }),
});

export const { useCreatePaymentMutation } = paymentSlice;
