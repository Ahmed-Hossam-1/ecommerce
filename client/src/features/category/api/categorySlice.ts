import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Category {
  categoryId?: string;
  categoryName: string;
  categoryDescription: string;
}

export const categorySlice = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  tagTypes: ["Categories"],
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (category: Category) => ({
        url: "/api/category",
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["Categories"],
    }),
    updateCategory: builder.mutation({
      query: (category: Category) => ({
        url: `/api/category/${category.categoryId}`,
        method: "PUT",
        body: category,
      }),
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: builder.mutation({
      query: (categoryId: string) => ({
        url: `/api/category/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
    getAllCategories: builder.query({
      query: () => "/api/category",
      providesTags: ["Categories"],
    }),
    getCategoryById: builder.query({
      query: (categoryId: string) => ({
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
