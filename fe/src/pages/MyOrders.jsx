import { useGetMyOrdersQuery } from "../redux/apis/orderApi";
import PageWrapper from "../components/PageWrapper";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyOrders = () => {
  const { data: orders = [], isLoading, error, refetch } = useGetMyOrdersQuery();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  useEffect(() => {
    refetch();
  }, [user, refetch]);

  useEffect(() => {
    if (error) {
      toast.error("Không thể tải đơn hàng.");
    }
  }, [error]);

  useEffect(() => {
    if (!isLoading && orders.length === 0) {
      toast.info("Bạn chưa có đơn hàng nào.");
    }
  }, [isLoading, orders.length]);

  if (isLoading) return <div className="p-10 text-lg text-gray-500">Đang tải đơn hàng...</div>;

  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto py-10">
        <h1 className="text-3xl font-extrabold text-center text-green-700 mb-8 drop-shadow">Đơn hàng của tôi</h1>
        {orders.length === 0 && (
          <div className="text-center text-gray-400 text-lg py-16">Bạn chưa có đơn hàng nào.</div>
        )}
        <div className="space-y-8">
          {orders.map((order) => (
            <div key={order._id} className="bg-white border border-green-100 rounded-2xl shadow-lg p-8">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <div>
                  <div className="font-bold text-lg text-green-700 mb-1">
                    Mã đơn: <span className="font-mono">{order._id}</span>
                  </div>
                  <div className="text-gray-700">
                    Tên: <span className="font-semibold">{order.userId?.name || "N/A"}</span>
                  </div>
                  <div className="text-gray-700">
                    SĐT: <span className="font-semibold">{order.phone || "N/A"}</span>
                  </div>
                  <div className="text-gray-700">
                    Địa chỉ: <span className="font-semibold">{order.deliveryAddress}</span>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                  <div className="text-xl font-bold text-green-700 mb-1">Tổng: ${order.totalPrice}</div>
                  <div className="text-gray-600">Ngày đặt: {new Date(order.orderDate).toLocaleDateString()}</div>
                  <div className="mt-2">
                    <span className="font-semibold">Trạng thái:</span>{" "}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        order.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "shipped"
                          ? "bg-blue-100 text-blue-700"
                          : order.status === "delivered"
                          ? "bg-green-100 text-green-700"
                          : order.status === "canceled"
                          ? "bg-red-100 text-red-700"
                          : ""
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="font-semibold mb-2 text-green-600">Sản phẩm:</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {order.products.map((p, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg bg-gray-50 p-4 flex flex-col gap-1">
                      <div>
                        <span className="font-semibold">Tên sản phẩm:</span> {p.productId?.name || p.productId}
                      </div>
                      <div>
                        <span className="font-semibold">Size:</span> {p.size}
                      </div>
                      <div>
                        <span className="font-semibold">Số lượng:</span> {p.quantity}
                      </div>
                      <div>
                        <span className="font-semibold">Giá:</span> ${p.price}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </PageWrapper>
  );
};

export default MyOrders;
