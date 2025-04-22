import { useGetAllOrdersQuery, useUpdateOrderStatusMutation } from "../redux/apis/orderApi.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import PageWrapper from "../components/PageWrapper";
const AllOrders = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const { data: orders, isLoading, error } = useGetAllOrdersQuery();
  const [updateOrderStatus] = useUpdateOrderStatusMutation();

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/"); // Chặn người không phải admin
    }
  }, [user]);

  const handleChangeStatus = async (orderId, newStatus) => {
    try {
      await updateOrderStatus({ orderId, status: newStatus }).unwrap();
    } catch (err) {
      alert("Lỗi khi cập nhật trạng thái!");
    }
  };

  if (isLoading) return <div className="p-10">Loading orders...</div>;
  if (error) return <div className="p-10 text-red-600">Error loading orders.</div>;

  return (
    <PageWrapper>
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">All Orders (Admin)</h1>
      {orders.map((order) => (
        <div key={order._id} className="border p-6 mb-6 rounded-lg shadow-sm bg-white">
          <div className="mb-2"><strong>Order ID:</strong> {order._id}</div>
          <div className="mb-2"><strong>User ID:</strong> {order.userId}</div>
          <div className="mb-2"><strong>Address:</strong> {order.deliveryAddress}</div>
          <div className="mb-2"><strong>Total:</strong> ${order.totalPrice}</div>
          <div className="mb-2"><strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</div>

          <div className="mb-4">
            <strong>Status:</strong>
            <select
              value={order.status}
              onChange={(e) => handleChangeStatus(order._id, e.target.value)}
              className="ml-2 border p-1 rounded"
            >
              <option value="pending">pending</option>
              <option value="shipped">shipped</option>
              <option value="delivered">delivered</option>
              <option value="canceled">canceled</option>
            </select>
          </div>

          <div>
            <h2 className="font-semibold mb-2">Products:</h2>
            <ul className="space-y-2">
              {order.products.map((p, idx) => (
                <li key={idx} className="border p-2 rounded bg-gray-50">
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

export default AllOrders;
