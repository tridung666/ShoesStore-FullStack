import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Cart'],
  endpoints: (builder) => ({
    getCart: builder.query({
      query: (userId) => `/api/cart/${userId}`,
      providesTags: (result, error, userId) => [{ type: 'Cart', id: userId }],
    }),
    updateCart: builder.mutation({
      query: ({ userId, items }) => ({
        url: `/api/cart/${userId}`,
        method: 'PUT',
        body: { items },
      }),
      invalidatesTags: (result, error, { userId }) => [{ type: 'Cart', id: userId }],
    }),
    deleteCart: builder.mutation({
      query: (userId) => ({
        url: `/api/cart/${userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, userId) => [{ type: 'Cart', id: userId }],
    }),
    deleteCartItem: builder.mutation({
      query: ({ userId, productId, size, color }) => ({
        url: `/api/cart/${userId}/item/${productId}?size=${size}&color=${color}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { userId }) => [{ type: 'Cart', id: userId }],
    }),
  }),
});

export const {
  useGetCartQuery,
  useUpdateCartMutation,
  useDeleteCartMutation,
  useDeleteCartItemMutation,
} = cartApi;
