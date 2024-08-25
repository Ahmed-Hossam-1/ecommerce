/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "universal-cookie";

export interface createProductRequest {
  name: string;
  description: string;
  price: number;
  quantity: number;
  categoryId: string;
  mainImage: string;
  images: string[];
}
export interface createProductResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  mainImage: string;
  images: string[];
  categoryId: string;
  sellerId: string;
}

export const productSlice = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  tagTypes: ["product"],
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => "/api/product",
      providesTags: ["product"],
    }),
    getProduct: builder.query({
      query: (id) => `/api/product/${id}`,
      providesTags: ["product"],
    }),
    createProduct: builder.mutation<
      createProductResponse,
      createProductRequest
    >({
      query: (body) => {
        const cookies = new Cookies(null, { path: "/" });
        const token = cookies.get("token");

        return {
          url: "/api/product",
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
          },
          body,
        };
      },
      invalidatesTags: ["product"],
    }),

    updateProduct: builder.mutation({
      query: ({ id, data }) => {
        const cookies = new Cookies(null, { path: "/" });
        const token = cookies.get("token");

        return {
          url: `/api/product/${id}`,
          method: "PUT",
          headers: {
            authorization: `Bearer ${token}`,
          },
          body: data,
        };
      },
      invalidatesTags: ["product"],
    }),
    deleteProduct: builder.mutation({
      query: (id: string) => ({
        url: `/api/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productSlice;
