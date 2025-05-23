import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewApi = createApi({
    reducerPath: 'reviewApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth?.token;
            if (token) headers.set('Authorization', `Bearer ${token}`);
            return headers;
        }
    }),
    tagTypes: ['Review'],
    endpoints: (builder) => ({
        // ✅ Lấy reviews theo sản phẩm
        getReviewsByProduct: builder.query({
            query: (productId) => `/api/reviews/product/${productId}`,
            providesTags: ['Review'],
        }),
        // ✅ Tạo review mới
        createReview: builder.mutation({
            query: (data) => ({
                url: '/api/reviews',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Review'],
        }),
        // ✅ Xóa review (admin)
        deleteReview: builder.mutation({
            query: (reviewId) => ({
                url: `/api/reviews/${reviewId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Review'],
        }),
        // ✅ Sửa review (admin)
        updateReview: builder.mutation({
            query: ({ reviewId, ...data }) => ({
                url: `/api/reviews/${reviewId}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Review'],
        }),
    }),
});

export const {
    useGetReviewsByProductQuery,
    useCreateReviewMutation,
    useDeleteReviewMutation,
    useUpdateReviewMutation,
} = reviewApi;
