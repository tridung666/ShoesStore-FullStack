import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    }
  }),
  tagTypes: ['Product'],
  endpoints: (builder) => ({
    // ✅ Lấy toàn bộ sản phẩm
    getAllProducts: builder.query({
      query: () => '/api/products',
      providesTags: ['Product'],
    }),

    // ✅ Lấy sản phẩm theo brand
    getProductsByBrand: builder.query({
      query: (brand) => `/api/products/brand/${brand}`,
      providesTags: ['Product'],
    }),

    // ✅ Lấy chi tiết sản phẩm
    getProductById: builder.query({
      query: (id) => `/api/products/${id}`,
      providesTags: ['Product'],
    }),

    // ✅ Thêm sản phẩm mới
    createProduct: builder.mutation({
      query: (body) => ({
        url: '/api/products',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Product'],
    }),

    // ✅ Cập nhật sản phẩm
    updateProduct: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/api/products/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Product'],
    }),

    // ✅ Xoá sản phẩm
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/api/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductsByBrandQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
