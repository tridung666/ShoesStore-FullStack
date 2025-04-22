import { useGetMyOrdersQuery } from "../redux/apis/orderApi.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import PageWrapper from "../components/PageWrapper";


const MyOrders = () => {
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user]);

  if (isLoading) return <div className="p-10">Loading orders...</div>;
  if (error) return <div className="p-10 text-red-600">Error fetching orders.</div>;
  if (!orders || orders.length === 0) return <div className="p-10">No orders found.</div>;

  return (
    <PageWrapper>
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      {orders.map((order) => (
        <div key={order._id} className="border p-6 mb-6 rounded-lg shadow-sm bg-white">
          <div className="mb-2">
            <span className="font-semibold">Order ID:</span> {order._id}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Date:</span> {new Date(order.orderDate).toLocaleDateString()}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Status:</span>{" "}
            <span className="capitalize">{order.status}</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold">Total:</span> ${order.totalPrice}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Delivery Address:</span> {order.deliveryAddress}
          </div>

          <div className="mt-4">
            <h2 className="font-semibold mb-2">Products:</h2>
            <ul className="space-y-2">
              {order.products.map((p, index) => (
                <li key={index} className="border p-2 rounded bg-gray-50">
                  <div><strong>Product ID:</strong> {p.productId}</div>
                  <div><strong>Size:</strong> {p.size}</div>
                  <div><strong>Quantity:</strong> {p.quantity}</div>
                  <div><strong>Price:</strong> ${p.price}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
    </PageWrapper>
  );
};

export default MyOrders;
