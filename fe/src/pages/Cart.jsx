import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/slices/cartSlice.jsx';
import { useNavigate } from 'react-router-dom';
import PageWrapper from "../components/PageWrapper";
import { FaTrashAlt, FaPen } from "react-icons/fa";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, totalPrice } = useSelector((state) => state.cart);

  const handleQuantityChange = (id, size, value) => {
    const quantity = Number(value);
    if (quantity > 0 && Number.isInteger(quantity)) {
      dispatch(updateQuantity({ productId: id, size, quantity }));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <PageWrapper>
      <div className="p-6 md:p-10">
        <h1 className="text-4xl font-semibold mb-6">Cart <span className="text-lg font-normal">({cartItems.length} items)</span></h1>

        {cartItems.length === 0 ? (
          <div className="text-center text-gray-500 text-lg py-16">
            <img src="/empty-cart.svg" alt="Empty cart" className="mx-auto w-40 mb-4 opacity-70" />
            Your basket is empty.
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* LEFT: Item List */}
            <div className="flex-1 space-y-4">
              {cartItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center p-6 min-h-[120px] bg-secondary rounded-xl shadow justify-between"
                >
                  <div className="flex items-center gap-4">
                    <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded" />
                    <div>
                      <div className="font-bold text-lg">{item.name}</div>
                      <div className="text-green-700 font-semibold">Size: {item.size} UK</div>
                      <div className="flex items-center mt-2">
                        <input
                          type="number"
                          min={1}
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.productId, item.size, e.target.value)}
                          className="w-14 border border-gray-300 rounded-lg text-center px-2 py-1"
                        />
                        <FaPen className="ml-2 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-lg font-bold">${item.price.toFixed(2)}</div>
                    <button
                      onClick={() => handleRemove(item.productId)}
                      className="p-2 rounded-full hover:bg-red-500 hover:text-white transition"
                      title="Xóa sản phẩm"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT: Order Summary */}
            <div className="w-full lg:w-[300px] bg-secondary p-6 rounded-xl shadow space-y-4 h-fit">
              <h2 className="font-semibold text-lg">Order summary</h2>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${(totalPrice - 2).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>$2.00</span>
              </div>
              <div className="flex justify-between font-bold text-xl pt-2 border-t">
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <button
                onClick={() => navigate("/order")}
                className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-green-800 transition"
              >
                Continue to payment →
              </button>
            </div>
          </div>
        )}
      </div>
    </PageWrapper>
  );
};

export default Cart;
