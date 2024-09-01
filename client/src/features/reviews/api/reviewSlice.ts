import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import Cookies from "universal-cookie";

interface createReviewRequest {
  productId: string;
  rating: number;
  review: string;
}

interface Review {
  id: string;
  productId: string;
  rating: number;
  review: string;
  createdAt: Date;
}

export const reviewSlice = createApi({
  reducerPath: "reviewApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  tagTypes: ["Review"],
  endpoints: (builder) => ({
    getReviewsByProductId: builder.query<
      { reviews: Review[] },
      { productId: string }
    >({
      query: ({ productId }) => {
        const cookies = new Cookies(null, { path: "/" });
        const token = cookies.get("token");

        return {
          url: `/api/reviews/${productId}`,
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        };
      },
      providesTags: ["Review"],
    }),

    createReview: builder.mutation<void, createReviewRequest>({
      query: (body) => {
        const cookies = new Cookies(null, { path: "/" });
        const token = cookies.get("token");

        return {
          url: "/api/reviews/create",
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
          },
          body,
        };
      },
      invalidatesTags: ["Review"],
    }),
  }),
});

export const { useGetReviewsByProductIdQuery, useCreateReviewMutation } =
  reviewSlice;
