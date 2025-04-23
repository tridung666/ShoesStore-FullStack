import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useCreateOrderMutation } from "../redux/apis/orderApi.jsx";
import { clearCart } from "../redux/slices/cartSlice.jsx";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

const OrderForm = () => {
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState(""); // ✅ Thêm state cho số điện thoại
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
      phone, // ✅ Gửi phone kèm nếu bạn muốn xử lý ở backend
      products: cartItems.map((item) => ({
        productId: item.productId,
        size: item.size,
        quantity: item.quantity,
        price: item.price
      }))
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
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Delivery Information</h1>

      <form onSubmit={handlePlaceOrder} className="space-y-4">
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Nhập địa chỉ giao hàng..."
          className="w-full p-4 border rounded"
          rows={4}
          required
        ></textarea>

        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Nhập số điện thoại..."
          className="w-full p-4 border rounded"
          required
        />

        <div className="text-lg">
          <strong>Total: </strong>${total}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded text-xl"
          disabled={isLoading}
        >
          {isLoading ? "Đang xử lý..." : "Đặt hàng"}
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
