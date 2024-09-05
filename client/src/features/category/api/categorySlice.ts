import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  createCategoryRequest,
  updateCategoryRequest,
} from "../../../types/api";
import { Category } from "../../../types/type";
import Cookies from "universal-cookie";

export const categorySlice = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  tagTypes: ["Categories"],
  endpoints: (builder) => ({
    createCategory: builder.mutation<
      { message: string },
      createCategoryRequest
    >({
      query: (category) => {
        const cookies = new Cookies(null, { path: "/" });
        const token = cookies.get("token");
        return {
          url: "/api/category",
          method: "POST",
          body: category,
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["Categories"],
    }),

    updateCategory: builder.mutation<
      { message: string },
      updateCategoryRequest
    >({
      query: (category) => {
        const cookies = new Cookies(null, { path: "/" });
        const token = cookies.get("token");
        return {
          url: `/api/category/${category.categoryId}`,
          method: "PUT",
          body: category,
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["Categories"],
    }),

    deleteCategory: builder.mutation<
      { message: string },
      { categoryId: string }
    >({
      query: ({ categoryId }) => {
        const cookies = new Cookies(null, { path: "/" });
        const token = cookies.get("token");

        return {
          url: `/api/category/${categoryId}`,
          method: "DELETE",
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
      invalidatesTags: ["Categories"],
    }),
    getAllCategories: builder.query<{ categories: Category[] }, void>({
      query: () => "/api/category",
      providesTags: ["Categories"],
    }),
    getCategoryById: builder.query<
      { category: Category },
      { categoryId: string }
    >({
      query: (categoryId) => ({
        url: `/api/category/${categoryId}`,
      }),
      providesTags: ["Categories"],
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useGetAllCategoriesQuery,
  useDeleteCategoryMutation,
  useGetCategoryByIdQuery,
} = categorySlice;
