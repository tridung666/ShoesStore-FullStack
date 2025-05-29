import { useGetAllOrdersQuery, useUpdateOrderStatusMutation, useDeleteOrderMutation } from "../../redux/apis/orderApi.jsx";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PageWrapper from "../../components/PageWrapper.jsx";
import { FaUsers, FaBoxOpen, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const AllOrders = () => {
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const { data: orders = [], isLoading, error } = useGetAllOrdersQuery();
  const [updateOrderStatus, { isLoading: isUpdating }] = useUpdateOrderStatusMutation();
  const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();
  const [processingIds, setProcessingIds] = useState(new Set());

  useEffect(() => {
    if (user && user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChangeStatus = async (orderId, newStatus) => {
    if (processingIds.has(orderId)) return; // tránh spam
    setProcessingIds(prev => new Set(prev).add(orderId));

    try {
      await updateOrderStatus({ orderId, status: newStatus }).unwrap();
      toast.success("Cập nhật trạng thái thành công!");
    } catch {
      toast.error("Lỗi khi cập nhật trạng thái!");
    } finally {
      setProcessingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(orderId);
        return newSet;
      });
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xoá đơn hàng này không?")) return;
    if (processingIds.has(orderId)) return; // tránh spam
    setProcessingIds(prev => new Set(prev).add(orderId));

    try {
      await deleteOrder(orderId).unwrap();
      toast.success("Xoá đơn hàng thành công!");
    } catch {
      toast.error("Lỗi khi xoá đơn hàng!");
    } finally {
      setProcessingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(orderId);
        return newSet;
      });
    }
  };

  if (isLoading) return <div className="p-10">Đang tải đơn hàng...</div>;
  if (error) return <div className="p-10 text-red-600">Không thể tải đơn hàng.</div>;

  return (
    <PageWrapper>
      <div className="min-h-screen w-full bg-gradient-to-br from-primary via-white to-blue-50 py-10">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-extrabold text-center text-green-700 mb-8 drop-shadow">
            Order Management
          </h1>

          {/* Menu admin */}
          <div className="flex justify-center space-x-6 mb-10">
            <button
              onClick={() => navigate('/admin/account')}
              className="flex items-center gap-2 px-5 py-2 rounded-lg font-semibold text-green-700 bg-green-100 hover:bg-primary hover:text-white transition"
            >
              <FaUsers /> User Management
            </button>
            <button
              onClick={() => navigate('/admin/products')}
              className="flex items-center gap-2 px-5 py-2 rounded-lg font-semibold text-green-700 bg-green-100 hover:bg-primary hover:text-white transition"
            >
              <FaBoxOpen /> Product Management
            </button>
          </div>

          {orders.length === 0 && (
            <div className="text-center text-gray-400 text-lg py-16">No orders found.</div>
          )}

          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white border border-green-100 rounded-2xl shadow-lg p-8"
              >
                <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                  <div>
                    <div className="font-bold text-lg text-green-700 mb-1">
                      Order ID: <span className="font-mono">{order._id}</span>
                    </div>
                    <div className="text-gray-700">
                      Name: <span className="font-semibold">{order.userId?.name || "N/A"}</span>
                    </div>
                    <div className="text-gray-700">
                      Phone: <span className="font-semibold">{order.phone || "N/A"}</span>
                    </div>
                    <div className="text-gray-700">
                      Address: <span className="font-semibold">{order.deliveryAddress}</span>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 text-right flex items-center gap-3">
                    <div>
                      <div className="text-xl font-bold text-green-700 mb-1">
                        Total: ${order.totalPrice}
                      </div>
                      <div className="text-gray-600">
                        Date: {new Date(order.orderDate).toLocaleDateString()}
                      </div>
                    </div>
                    <div>
                      <span className="font-semibold">Status:</span>
                      <select
                        disabled={processingIds.has(order._id)}
                        value={order.status}
                        onChange={(e) => handleChangeStatus(order._id, e.target.value)}
                        className="ml-2 border border-green-300 p-1 rounded focus:ring-2 focus:ring-primary"
                      >
                        <option value="pending">pending</option>
                        <option value="shipped">shipped</option>
                        <option value="delivered">delivered</option>
                        <option value="canceled">canceled</option>
                      </select>
                    </div>
                    <button
                      disabled={processingIds.has(order._id)}
                      onClick={() => handleDeleteOrder(order._id)}
                      title="Xóa đơn hàng"
                      className="text-red-600 hover:text-red-800 transition disabled:opacity-50"
                    >
                      <FaTrash size={20} />
                    </button>
                  </div>
                </div>
                <div>
                  <h2 className="font-semibold mb-2 text-green-600">Products:</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {order.products.map((p, idx) => (
                      <div
                        key={idx}
                        className="border border-gray-200 rounded-lg bg-gray-50 p-4 flex flex-col md:flex-row md:items-center md:gap-6"
                      >
                        <div className="flex-1">
                          <div>
                            <span className="font-semibold">Product:</span> {p.productId?.name || p.productId}
                          </div>
                          <div>
                            <span className="font-semibold">Size:</span> {p.size}
                          </div>
                          <div>
                            <span className="font-semibold">Quantity:</span> {p.quantity}
                          </div>
                          <div>
                            <span className="font-semibold">Price:</span> ${p.price}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default AllOrders;
