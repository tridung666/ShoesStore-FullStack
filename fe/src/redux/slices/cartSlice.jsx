import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
      state.totalPrice = state.cartItems.reduce(
        (acc, item) => acc + (item.productId.price || 0) * item.quantity,
        0
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.totalPrice = 0;
    },
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find(
        (i) => i.productId === item.productId && i.size === item.size && i.color === item.color
      );

      if (existItem) {
        existItem.quantity += item.quantity;
      } else {
        state.cartItems.push(item);
      }

      state.totalPrice = state.cartItems.reduce(
        (acc, item) => acc + (item.price || item.productId.price || 0) * item.quantity,
        0
      );
    },
    removeFromCart: (state, action) => {
      const { productId, size, color } = action.payload;
      state.cartItems = state.cartItems.filter(
        (i) => !(i.productId === productId && i.size === size && i.color === color)
      );

      state.totalPrice = state.cartItems.reduce(
        (acc, item) => acc + (item.price || item.productId.price || 0) * item.quantity,
        0
      );
    },
    updateQuantity: (state, action) => {
      const { productId, size, color, quantity } = action.payload;
      const item = state.cartItems.find(
        (i) => i.productId === productId && i.size === size && i.color === color
      );

      if (item) {
        item.quantity = quantity;
      }

      state.totalPrice = state.cartItems.reduce(
        (acc, item) => acc + (item.price || item.productId.price || 0) * item.quantity,
        0
      );
    },
  },
});

export const { setCartItems, clearCart, addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
