import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.jsx';
import cartReducer from './slices/cartSlice.jsx';

import { authApi } from './apis/authApi.jsx';
import { productApi } from './apis/productApi.jsx';
import { orderApi } from './apis/orderApi.jsx';
import { cartApi } from './apis/cartApi.jsx';
import { reviewApi } from './apis/reviewApi.jsx'; // ✅ Thêm dòng này

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,

    [authApi.reducerPath]: authApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer, // ✅ Thêm reducer reviewApi
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      productApi.middleware,
      orderApi.middleware,
      cartApi.middleware,
      reviewApi.middleware // ✅ Thêm middleware reviewApi
    ),
});