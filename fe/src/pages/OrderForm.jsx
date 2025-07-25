import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useCreateOrderMutation } from "../redux/apis/orderApi.jsx";
import { clearCart } from "../redux/slices/cartSlice.jsx";
import { useNavigate } from "react-router-dom";
import { FiMapPin, FiPhone, FiShoppingCart } from "react-icons/fi";
import { FaBoxOpen } from "react-icons/fa";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const OrderForm = () => {
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const cartItems = useSelector((state) => state.cart.cartItems);
  const total = useSelector((state) => state.cart.totalPrice);
  const user = useSelector((state) => state.auth.user);
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!address.trim()) {
      toast.error("Vui lòng nhập địa chỉ giao hàng!");
      return;
    }

    if (!phone.trim()) {
      toast.error("Vui lòng nhập số điện thoại!");
      return;
    }

    const orderData = {
      userId: user._id,
      deliveryAddress: address,
      totalPrice: total,
      phone,
      products: cartItems.map((item) => ({
        productId: item.productId._id || item.productId,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        price: item.productId?.price || item.price,
      })),
    };

    try {
      await createOrder(orderData).unwrap();
      dispatch(clearCart());
      toast.success("Đặt hàng thành công!");
      navigate("/");
    } catch (err) {
      toast.error("Lỗi khi đặt hàng: " + (err.data?.message || err.error));
    }
  };

  return (
    <div className="min-h-screen bg-secondary flex items-center justify-center py-10 px-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden border border-primary/30">
        {/* Left: Shipping Info */}
        <div className="md:w-1/2 w-full p-8 flex flex-col justify-center bg-gradient-to-br from-primary/10 to-secondary">
          <h1 className="text-3xl font-bold mb-6 text-primary flex items-center gap-2 select-none">
            <FiMapPin className="text-primary/70" /> Thông tin giao hàng
          </h1>
          <form onSubmit={handlePlaceOrder} className="space-y-5">
            <div>
              <label
                className="block text-primary font-semibold mb-2"
                htmlFor="address"
              >
                Địa chỉ giao hàng
              </label>
              <textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Nhập địa chỉ giao hàng..."
                className="w-full p-4 border-2 border-primary/30 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                rows={3}
                required
              />
            </div>
            <div>
              <label
                className="block text-primary font-semibold mb-2"
                htmlFor="phone"
              >
                Số điện thoại
              </label>
              <div className="relative">
                <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-primary/50" />
                <input
                  id="phone"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Nhập số điện thoại..."
                  className="w-full pl-10 p-4 border-2 border-primary/30 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-secondary py-3 rounded-xl text-lg font-semibold shadow-lg transition disabled:opacity-60 flex items-center justify-center gap-2"
            >
              <FiShoppingCart className="text-xl" />
              {isLoading ? "Đang xử lý..." : "Đặt hàng"}
            </button>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div className="md:w-1/2 w-full p-8 bg-white flex flex-col border-t md:border-t-0 md:border-l border-primary/30">
          <h2 className="text-2xl font-bold mb-4 text-primary flex items-center gap-2 select-none">
            <FaBoxOpen className="text-primary/70" /> Đơn hàng của bạn
          </h2>
          <div className="flex-1 overflow-y-auto max-h-64 pr-2">
            {cartItems.length === 0 ? (
              <div className="text-gray-400 italic">Giỏ hàng trống.</div>
            ) : (
              <ul className="divide-y divide-primary/20">
                {cartItems.map((item, idx) => (
                  <li key={idx} className="py-3 flex items-center gap-3">
                    <div className="flex-1">
                      <div className="font-semibold text-primary">
                        {item.productId?.name || item.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        Số lượng: <span className="font-medium">{item.quantity}</span>
                        {item.size && (
                          <span className="ml-2">
                            | Size: <span className="font-medium">{item.size}</span>
                          </span>
                        )}
                        {item.color && (
                          <span className="ml-2">
                            | Màu: <span className="font-medium">{item.color}</span>
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-primary font-bold text-lg">
                      ${item.productId?.price || item.price}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="border-t border-primary/20 mt-6 pt-4 flex items-center justify-between">
            <span className="text-lg font-semibold text-primary">Tổng cộng:</span>
            <span className="text-2xl text-primary font-bold">${total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
