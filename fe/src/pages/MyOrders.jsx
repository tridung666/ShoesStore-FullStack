import { useGetMyOrdersQuery } from "../redux/apis/orderApi";
import PageWrapper from "../components/PageWrapper";

const MyOrders = () => {
  const { data: orders = [], isLoading, error } = useGetMyOrdersQuery();

  if (isLoading) return <div className="p-10">Loading your orders...</div>;
  if (error) return <div className="p-10 text-red-600">Error fetching orders.</div>;

  return (
    <PageWrapper>
      <div className="p-10">
        <h1 className="text-3xl font-bold mb-6">My Orders</h1>

        {orders.map((order) => (
          <div key={order._id} className="border p-6 mb-6 rounded-lg shadow-sm bg-white">
            <div className="mb-2"><strong>Order ID:</strong> {order._id}</div>
            <div className="mb-2"><strong>Name:</strong> {order.userId?.name || "Unknown"}</div>
            <div className="mb-2"><strong>Phone:</strong> {order.phone || order.userId?.phone || "N/A"}</div>
            <div className="mb-2"><strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</div>
            <div className="mb-2"><strong>Status:</strong> {order.status}</div>
            <div className="mb-2"><strong>Total:</strong> ${order.totalPrice}</div>
            <div className="mb-2"><strong>Delivery Address:</strong> {order.deliveryAddress}</div>

            <div className="mt-4">
              <h2 className="font-semibold mb-2">Products:</h2>
              <ul className="space-y-2">
                {order.products.map((p, idx) => (
                  <li key={idx} className="border p-2 rounded bg-gray-50">
                    <div><strong>Product:</strong> {p.productId?.name || p.productId}</div>
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
