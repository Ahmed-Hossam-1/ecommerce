/* eslint-disable @typescript-eslint/no-explicit-any */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "universal-cookie";
import { Product } from "../../../types/type";
import {
  createProductRequest,
  createProductResponse,
} from "../../../types/api";

export const productSlice = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getAllProducts: builder.query<{ products: Product[] }, void>({
      query: () => "/api/product/all",
      providesTags: ["Product"],
    }),
    getProductsByCategory: builder.query<
      { products: Product[] },
      { productByCategoryId: string }
    >({
      query: ({ productByCategoryId }) =>
        `/api/product/products/${productByCategoryId}`,
      providesTags: ["Product"],
    }),
    getProduct: builder.query<{ product: Product }, { productId: string }>({
      query: ({ productId }) => `/api/product/single/${productId}`,
      providesTags: ["Product"],
    }),
    createProduct: builder.mutation<
      createProductResponse,
      createProductRequest
    >({
      query: (body) => {
        const cookies = new Cookies(null, { path: "/" });
        const token = cookies.get("token");

        return {
          url: "/api/product/create",
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
          },
          body,
        };
      },
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation<
      { message: string },
      { id: string; data: Product }
    >({
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
      invalidatesTags: ["Product"],
    }),

    deleteProduct: builder.mutation({
      query: (id: string) => ({
        url: `/api/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    searchProducts: builder.mutation<
      { products: createProductResponse[] },
      { searchTerm: string; categoryId: string }
    >({
      query: ({ categoryId, searchTerm }) => ({
        url: `/api/product/search?searchTerm=${searchTerm}&categoryId=${categoryId}`,
        method: "POST",
      }),
      invalidatesTags: ["Product"],
    }),

    getTopSellerProducts: builder.query<{ products: Product[] }, void>({
      query: () => {
        return {
          url: "/api/product/top-product/top-selling?limit=10",
          method: "GET",
        };
      },
      providesTags: ["Product"],
    }),

    getTopRatedProducts: builder.query({
      query: () => {
        return {
          url: "/api/product/top-product/top-rated?limit=10",
          method: "GET",
        };
      },
      providesTags: ["Product"],
    }),
    getProductsBySeller: builder.query({
      query: () => {
        const cookies = new Cookies(null, { path: "/" });
        const token = cookies.get("token");
        return {
          url: "/api/product/get-by-sellerId",
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["Product"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useSearchProductsMutation,
  useGetProductsByCategoryQuery,
  useGetTopSellerProductsQuery,
  useGetTopRatedProductsQuery,
  useGetProductsBySellerQuery,
} = productSlice;
