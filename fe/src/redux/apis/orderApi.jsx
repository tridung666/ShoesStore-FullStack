import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    }
  }),
  tagTypes: ['Order'],
  endpoints: (builder) => ({
    // ✅ Tạo đơn hàng mới
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: '/api/orders',
        method: 'POST',
        body: orderData,
      }),
      invalidatesTags: ['Order'],
    }),

    // ✅ Lấy đơn hàng của người dùng hiện tại
    getMyOrders: builder.query({
      query: () => '/api/orders/my-orders',
      providesTags: ['Order'],
    }),

    // ✅ Lấy tất cả đơn hàng (admin)
    getAllOrders: builder.query({
      query: () => '/api/orders',
      providesTags: ['Order'],
    }),

    // ✅ Cập nhật trạng thái đơn hàng (admin)
    updateOrderStatus: builder.mutation({
      query: ({ orderId, status }) => ({
        url: `/api/orders/${orderId}/status`, // ✅ ĐÃ SỬA
        method: 'PUT',
        body: { status },
      }),
      invalidatesTags: ['Order'],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} = orderApi;
