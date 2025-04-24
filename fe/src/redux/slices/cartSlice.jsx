// src/redux/slices/cartSlice.jsx
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [], // [{ productId, name, price, image, size, quantity }]
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.cartItems.find(
        (p) => p.productId === item.productId && p.size === item.size
      );
      if (existing) {
        existing.quantity += item.quantity;
      } else {
        state.cartItems.push(item);
      }
      state.totalPrice = calcTotal(state.cartItems);
    },

    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((p) => p.productId !== action.payload);
      state.totalPrice = calcTotal(state.cartItems);
    },

    updateQuantity: (state, action) => {
      const { productId, size, quantity } = action.payload;
      const item = state.cartItems.find(
        (p) => p.productId === productId && p.size === size
      );
      if (item) item.quantity = quantity;
      state.totalPrice = calcTotal(state.cartItems);
    },

    clearCart: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
    },
  },
});

const calcTotal = (items) => items.reduce((sum, i) => sum + i.price * i.quantity, 0);

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
