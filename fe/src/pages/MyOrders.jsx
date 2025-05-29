import { useGetMyOrdersQuery } from "../redux/apis/orderApi";
import PageWrapper from "../components/PageWrapper";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyOrders = () => {
  const { data: orders = [], isLoading, error, refetch } = useGetMyOrdersQuery();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    refetch();
  }, [user, refetch]);

  useEffect(() => {
    if (error) {
      toast.error("Failed to load orders.");
    }
  }, [error]);

  useEffect(() => {
    if (!isLoading && orders.length === 0) {
      toast.info("You have no orders yet.");
    }
  }, [isLoading, orders.length]);

  if (isLoading)
    return (
      <div className="p-10 text-lg text-primary/70 select-none">Loading orders...</div>
    );

  return (
    <PageWrapper>
      <div className="max-w-4xl mx-auto py-10">
        <h1 className="text-3xl font-extrabold text-center text-primary mb-8 drop-shadow select-none">
          My Orders
        </h1>
        {orders.length === 0 && (
          <div className="text-center text-primary/50 text-lg py-16 select-none">
            You have no orders yet.
          </div>
        )}
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white border border-primary/30 rounded-2xl shadow-lg p-8"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <div>
                  <div className="font-bold text-lg text-primary mb-1 select-text">
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
                <div className="mt-4 md:mt-0 text-right">
                  <div className="text-xl font-bold text-primary mb-1">
                    Total: ${order.totalPrice}
                  </div>
                  <div className="text-gray-600">
                    Order Date: {new Date(order.orderDate).toLocaleDateString()}
                  </div>
                  <div className="mt-2">
                    <span className="font-semibold">Status:</span>{" "}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold select-none ${
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
                <h2 className="font-semibold mb-2 text-accent select-none">Products:</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {order.products.map((p, idx) => (
                    <div
                      key={idx}
                      className="border border-primary/20 rounded-lg bg-secondary p-4 flex flex-col gap-1 select-text"
                    >
                      <div>
                        <span className="font-semibold">Product Name:</span>{" "}
                        {p.productId?.name || p.productId}
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
