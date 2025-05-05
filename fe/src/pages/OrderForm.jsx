import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useCreateOrderMutation } from "../redux/apis/orderApi.jsx";
import { clearCart } from "../redux/slices/cartSlice.jsx";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

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
      alert("Vui lòng nhập địa chỉ giao hàng!");
      return;
    }

    if (!phone.trim()) {
      alert("Vui lòng nhập số điện thoại!");
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
      navigate("/");
    } catch (err) {
      alert("Lỗi khi đặt hàng: " + (err.data?.message || err.error));
    }
  };

  return (
    <div className="py-12 px-4 min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-10">
        <h1 className="text-3xl font-bold mb-8 text-green-700 text-center">Thông tin giao hàng</h1>

        <form onSubmit={handlePlaceOrder} className="space-y-6">
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Nhập địa chỉ giao hàng..."
            className="w-full p-4 border-2 border-green-200 rounded-2xl focus:border-green-400 focus:ring-2 focus:ring-green-100 transition"
            rows={4}
            required
          ></textarea>

          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Nhập số điện thoại..."
            className="w-full p-4 border-2 border-green-200 rounded-2xl focus:border-green-400 focus:ring-2 focus:ring-green-100 transition"
            required
          />

          <div className="text-lg text-right mb-2">
            <strong>Tổng cộng: </strong>
            <span className="text-2xl text-green-700 font-bold">${total}</span>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white py-3 rounded-2xl text-xl font-semibold shadow-lg transition disabled:opacity-60"
            disabled={isLoading}
          >
            {isLoading ? "Đang xử lý..." : "Đặt hàng"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
