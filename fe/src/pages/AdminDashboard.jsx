import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem("token");

  // ✅ Kiểm tra quyền admin
  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (!storedUser || storedUser.role.toLowerCase() !== "admin") {
        alert("Bạn không có quyền truy cập trang admin!");
        navigate("/");
      } else {
        setUser(storedUser);
      }
    } catch (err) {
      console.error("❌ Lỗi đọc localStorage:", err);
      alert("Lỗi hệ thống, vui lòng đăng nhập lại!");
      navigate("/login");
    }
  }, []);

  // ✅ Gọi API lấy danh sách người dùng
  useEffect(() => {
    if (user) {
      fetch("http://localhost:5000/api/auth/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setUsers(data))
        .catch((err) => console.error("Lỗi khi lấy user list:", err));
    }
  }, [user]);

  // ✅ Xử lý xoá người dùng
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xoá người dùng này không?")) {
      try {
        await fetch(`http://localhost:5000/api/auth/users/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(users.filter((u) => u._id !== id));
      } catch (err) {
        console.error("❌ Lỗi khi xoá người dùng:", err);
        alert("Xoá thất bại!");
      }
    }
  };

  if (!user) return null;

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6">📊 Admin Dashboard</h1>
      <p className="mb-4 text-lg">Welcome, <strong>{user.name}</strong> (role: <strong>{user.role}</strong>)</p>

      <div className="bg-white shadow-md rounded-lg p-6 overflow-x-auto">
        <h2 className="text-2xl font-semibold mb-4">👥 User Accounts</h2>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Username</th>
              <th className="p-3 border">Role</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="hover:bg-gray-50">
                <td className="p-3 border">{u.name}</td>
                <td className="p-3 border">{u.username}</td>
                <td className="p-3 border">{u.role}</td>
                <td className="p-3 border space-x-2">
                  <button
                    onClick={() => alert(JSON.stringify(u, null, 2))}
                    className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600 text-sm"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(u._id)}
                    className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center p-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
