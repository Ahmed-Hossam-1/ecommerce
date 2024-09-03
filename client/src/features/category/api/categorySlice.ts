import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { createCategoryRequest, updateCategoryRequest } from "../../types/api";

export const categorySlice = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  tagTypes: ["Categories"],
  endpoints: (builder) => ({
    createCategory: builder.mutation<
      { message: string },
      createCategoryRequest
    >({
      query: (category) => ({
        url: "/api/category",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["Categories"],
    }),
    updateCategory: builder.mutation<
      { message: string },
      updateCategoryRequest
    >({
      query: (category) => ({
        url: `/api/category/${category.categoryId}`,
        method: "PUT",
        body: category,
      }),
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: builder.mutation<
      { message: string },
      { categoryId: string }
    >({
      query: (categoryId) => ({
        url: `/api/category/${categoryId}`,
        method: "DELETE",
      }),
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
