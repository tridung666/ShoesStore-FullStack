import { addToCart, removeFromCart, updateQuantity } from '../slices/cartSlice';
import { store } from '../store';

// Chuẩn bị dữ liệu gửi server
const prepareCartItemsForServer = (cartItems) => {
  return cartItems.map(item => ({
    productId: item.productId._id || item.productId,
    quantity: item.quantity,
    size: item.size,
    color: item.color,
  }));
};

// ✅ Hàm thêm vào giỏ hàng
export const handleAddToCart = async (dispatch, product, updateCart, userId) => {
  const cartItem = {
    productId: product._id,
    name: product.name,
    price: product.price,
    image: product.image,
    size: product.size,
    color: product.color,
    quantity: product.quantity,
  };

  dispatch(addToCart(cartItem));

  const state = store.getState();
  const { cartItems } = state.cart;

  if (userId) {
    try {
      const preparedItems = prepareCartItemsForServer(cartItems);
      await updateCart({ userId, items: preparedItems }).unwrap();
    } catch (err) {
      console.error("❌ Không thể đồng bộ giỏ hàng lên server:", err);
    }
  } else {
    console.error("❌ userId không tồn tại – chưa login?");
  }
};

// ✅ Hàm cập nhật số lượng
export const handleQuantityChange = async (dispatch, productId, size, color, quantity, updateCart) => {
  if (quantity > 0 && Number.isInteger(quantity)) {
    dispatch(updateQuantity({ productId, size, color, quantity }));

    const state = store.getState();
    const { cartItems } = state.cart;
    const userId = state.auth.user?._id;

    if (userId) {
      try {
        const preparedItems = prepareCartItemsForServer(cartItems);
        await updateCart({ userId, items: preparedItems }).unwrap();
      } catch (err) {
        console.error("❌ Lỗi đồng bộ cart khi cập nhật số lượng:", err);
      }
    }
  }
};

// ✅ Hàm xoá sản phẩm
export const handleRemoveFromCart = async (dispatch, productId, size, color, updateCart) => {
  dispatch(removeFromCart({ productId, size, color }));

  const state = store.getState();
  const { cartItems } = state.cart;
  const userId = state.auth.user?._id;

  if (userId) {
    try {
      const preparedItems = prepareCartItemsForServer(cartItems);
      await updateCart({ userId, items: preparedItems }).unwrap();
    } catch (err) {
      console.error("❌ Lỗi đồng bộ cart khi xoá sản phẩm:", err);
    }
  }
};
