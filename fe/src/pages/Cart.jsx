import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaTrashAlt, FaPen } from "react-icons/fa";
import {
  useGetCartQuery,
  useUpdateCartMutation,
  useDeleteCartMutation,
  useDeleteCartItemMutation,
} from "../redux/apis/cartApi";
import { FaShoppingCart } from "react-icons/fa";
import { updateQuantity, setCartItems, clearCart } from "../redux/slices/cartSlice";
import PageWrapper from "../components/PageWrapper";
import { toast } from "react-toastify";  // <-- import toast

const TAX = 2;

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const { data: cartData } = useGetCartQuery(user?._id, {
    skip: !user?._id,
  });
  const [updateCart] = useUpdateCartMutation();
  const [deleteCart] = useDeleteCartMutation();
  const [deleteCartItem] = useDeleteCartItemMutation();

  // Lấy cart từ DB lần đầu vào trang
  useEffect(() => {
    if (cartData?.items) {
      dispatch(setCartItems(cartData.items));
    }
  }, [cartData, dispatch]);

  // Sửa quantity
  const onQuantityChange = async (productId, size, color, value) => {
    const qty = Math.max(1, Number(value));
    if (isNaN(qty)) return;

    // Tạo bản sao cartItems với quantity mới
    const updatedCartItems = cartItems.map(item =>
      item.productId._id === productId && item.size === size && item.color === color
        ? { ...item, quantity: qty }
        : item
    );

    dispatch(setCartItems(updatedCartItems));

    const userId = user?._id;
    if (userId) {
      try {
        const preparedItems = updatedCartItems.map(item => ({
          productId: item.productId._id || item.productId,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
        }));
        const res = await updateCart({ userId, items: preparedItems }).unwrap();
        if (res?.items) {
          dispatch(setCartItems(res.items));
          toast.success("Cập nhật số lượng thành công!");
        }
      } catch (err) {
        console.error("❌ Lỗi update cart:", err);
        toast.error("Lỗi cập nhật số lượng sản phẩm!");
      }
    }
  };

  // Xoá 1 sản phẩm
  const onRemove = async (productId, size, color) => {
    if (!user?._id) return;
    try {
      await deleteCartItem({ userId: user._id, productId, size, color }).unwrap();
      toast.success("Đã xoá sản phẩm khỏi giỏ hàng!");
    } catch (error) {
      console.error('Error deleting cart item:', error);
      toast.error("Lỗi khi xoá sản phẩm!");
    }
  };

  // Xoá toàn bộ cart
  const onClearCart = async () => {
    if (!user?._id) return;
    if (!window.confirm("Bạn có chắc chắn muốn xoá toàn bộ giỏ hàng?")) return; // confirm trước
    try {
      await deleteCart(user._id).unwrap();
      dispatch(clearCart());
      toast.success("Giỏ hàng đã được xoá sạch!");
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error("Lỗi khi xoá giỏ hàng!");
    }
  };

  const subtotal = Math.max(0, Number(totalPrice ?? 0) - TAX);

  return (
    <PageWrapper>
      <div className="p-6 md:p-10">
        <h1 className="text-4xl font-semibold mb-6 flex items-center gap-3">
          <FaShoppingCart className="text-4xl text-primary" />
          <span className="text-xl font-medium">{cartItems.length} items</span>
        </h1>

        {cartItems.length === 0 ? (
          <div className="text-center text-gray-500 text-lg py-16">
            <img src="/empty-cart.svg" alt="Empty cart" className="mx-auto w-40 mb-4 opacity-70" />
            Your basket is empty.
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Items */}
            <div className="flex-1 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={`${item.productId._id}-${item.size}-${item.color}`}
                  className="flex items-center p-6 bg-secondary rounded-xl shadow justify-between"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.productId?.image}
                      alt={item.productId?.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div>
                      <div className="font-bold text-lg">{item.productId?.name}</div>
                      <div className="text-green-700 font-semibold">Size: {item.size} UK</div>
                      <div className="text-blue-600 font-semibold">Color: {item.color}</div>
                      <div className="flex items-center mt-2">
                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) =>
                            onQuantityChange(item.productId._id, item.size, item.color, e.target.value)
                          }
                          className="w-14 border border-gray-300 rounded-lg text-center px-2 py-1"
                        />
                        <FaPen className="ml-2 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-lg font-bold">
                      ${Number(item.productId?.price ?? 0).toFixed(2)}
                    </div>
                    <button
                      onClick={() => onRemove(item.productId._id, item.size, item.color)}
                      className="p-2 rounded-full hover:bg-red-500 hover:text-white transition"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-[300px] bg-secondary p-6 rounded-xl shadow space-y-4 h-fit">
              <h2 className="font-semibold text-lg">Order summary</h2>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${TAX.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-xl pt-2 border-t">
                <span>Total</span>
                <span>${Number(totalPrice ?? 0).toFixed(2)}</span>
              </div>

              <button
                onClick={() => navigate("/order")}
                className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-green-800 transition"
              >
                Proceed To Checkout →
              </button>

              <button
                onClick={onClearCart}
                className="w-full bg-red-500 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition mt-2"
              >
                Clear Cart 🗑
              </button>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default Cart;
