// src/redux/actions/cartActions.js
import { addToCart } from '../slices/cartSlice';

export const handleAddToCart = (dispatch, product) => {
  dispatch(
    addToCart({
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: product.size || 42, // mặc định size nếu chưa chọn
      quantity: product.quantity || 1,
    })
  );
};
