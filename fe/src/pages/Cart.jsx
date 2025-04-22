import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/slices/cartSlice.jsx';
import { useNavigate } from 'react-router-dom';
import PageWrapper from "../components/PageWrapper";
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, totalPrice } = useSelector((state) => state.cart);

  const handleQuantityChange = (id, size, value) => {
    const quantity = parseInt(value);
    if (quantity > 0) {
      dispatch(updateQuantity({ productId: id, size, quantity }));
    }
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <PageWrapper>
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Image</th>
                <th className="border p-2">Product</th>
                <th className="border p-2">Size</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Quantity</th>
                <th className="border p-2">Total</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, i) => (
                <tr key={i}>
                  <td className="border p-2">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover" />
                  </td>
                  <td className="border p-2">{item.name}</td>
                  <td className="border p-2">{item.size}</td>
                  <td className="border p-2">${item.price}</td>
                  <td className="border p-2">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.productId, item.size, e.target.value)}
                      className="w-16 border p-1"
                    />
                  </td>
                  <td className="border p-2">${item.price * item.quantity}</td>
                  <td className="border p-2">
                    <button onClick={() => handleRemove(item.productId)} className="bg-red-500 text-white px-3 py-1 rounded">
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 text-right text-2xl font-semibold">
            Total: ${totalPrice}
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={() => navigate("/order")}
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
    </PageWrapper>
  );
};

export default Cart;
