import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ['Users'],
  endpoints: (builder) => ({
    // ✅ Đăng nhập
    loginUser: builder.mutation({
      query: (body) => ({
        url: '/api/auth/login',
        method: 'POST',
        body,
      }),
    }),

    // ✅ Đăng ký
    registerUser: builder.mutation({
      query: (body) => ({
        url: '/api/auth/register',
        method: 'POST',
        body,
      }),
    }),

    // ✅ Đổi mật khẩu
    changePassword: builder.mutation({
      query: ({ currentPassword, newPassword }) => ({
        url: '/api/auth/change-password',
        method: 'PUT',
        body: { currentPassword, newPassword },
      }),
    }),

    // ✅ Lấy danh sách người dùng
    getAllUsers: builder.query({
      query: () => '/api/auth/users',
      providesTags: ['Users'],
    }),

    // ✅ Lấy 1 người dùng theo id
    getUserById: builder.query({
      query: (id) => `/api/auth/users/${id}`,
      providesTags: ['Users'],
    }),

    // ✅ Cập nhật người dùng
    updateUser: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/api/auth/users/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Users'],
    }),

    // ✅ Xoá người dùng
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/api/auth/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const {
  useLoginUserMutation,
  useRegisterUserMutation,
  useGetAllUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useChangePasswordMutation,
} = authApi;
