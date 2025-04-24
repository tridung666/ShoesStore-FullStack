import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  token: localStorage.getItem('token') || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    },
    updateUser: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    updatePassword: (state, action) => {
      state.user.password = action.payload.newPassword; // Giả sử bạn muốn lưu mật khẩu mới vào user
      localStorage.setItem('user', JSON.stringify(state.user)); // Cập nhật lại localStorage
    },
  },
});

export const { loginSuccess, logout, updateUser, updatePassword } = authSlice.actions;
export default authSlice.reducer;
