import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation
} from '../../redux/apis/authApi.jsx'; // ❌ Xoá useCreateUserMutation
import PageWrapper from "../../components/PageWrapper.jsx";
import { FaEdit, FaTrashAlt, FaBoxOpen, FaClipboardList } from "react-icons/fa";

const AdminDashboard = () => {
  const [formData, setFormData] = useState({ name: '', username: '', password: '', role: 'user' });
  const [editingUserId, setEditingUserId] = useState(null);

  const { data: users = [], isLoading, error } = useGetAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEdit = (user) => {
    setEditingUserId(user._id);
    setFormData({
      name: user.name,
      username: user.username,
      password: '', // reset password khi edit
      role: user.role
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id).unwrap();
      alert("✅ Xoá người dùng thành công!");
    } catch (err) {
      alert("❌ Xoá thất bại!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUserId) {
        await updateUser({ id: editingUserId, ...formData }).unwrap();
        alert("✅ Cập nhật người dùng thành công!");
      } else {
        alert("❗ Hiện tại chưa hỗ trợ thêm user mới!");
      }
      setFormData({ name: '', username: '', password: '', role: 'user' });
      setEditingUserId(null);
    } catch (err) {
      alert("❌ Lưu thất bại!");
    }
  };

  if (isLoading) return <div className="p-10">Đang tải người dùng...</div>;
  if (error) return <div className="p-10 text-red-600">Không thể tải danh sách người dùng</div>;

  return (
    <PageWrapper>
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-0">
        <div className="max-w-5xl mx-auto py-10">
          <h1 className="text-4xl font-extrabold text-center text-green-700 mb-2 drop-shadow">Admin Dashboard</h1>

          {/* Menu */}
          <div className="flex justify-center space-x-6 mb-10">
            <button onClick={() => navigate('/admin/products')} className="flex items-center gap-2 px-5 py-2 rounded-lg font-semibold text-green-700 bg-green-100 hover:bg-primary hover:text-white transition">
              <FaBoxOpen /> Product Management
            </button>
            <button onClick={() => navigate('/admin/orders')} className="flex items-center gap-2 px-5 py-2 rounded-lg font-semibold text-green-700 bg-green-100 hover:bg-primary hover:text-white transition">
              <FaClipboardList /> Order Management
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 mb-12 max-w-xl mx-auto space-y-4 border border-green-100">
            <h2 className="text-2xl font-bold text-green-600 mb-2">{editingUserId ? 'Edit User' : 'Add User (Chưa hỗ trợ)'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required className="border border-green-200 p-3 rounded-lg focus:ring-2 focus:ring-primary" />
              <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" required className="border border-green-200 p-3 rounded-lg focus:ring-2 focus:ring-primary" />
              <input name="password" value={formData.password} onChange={handleChange} placeholder="Password" required className="border border-green-200 p-3 rounded-lg focus:ring-2 focus:ring-primary md:col-span-2" />
              <select name="role" value={formData.role} onChange={handleChange} className="border border-green-200 p-3 rounded-lg focus:ring-2 focus:ring-primary md:col-span-2">
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="flex justify-end">
              <button type="submit" className="bg-primary hover:bg-green-900 text-white font-semibold px-6 py-2 rounded-lg transition">
                {editingUserId ? 'Update User' : 'Add User'}
              </button>
            </div>
          </form>

          {/* User Table */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
            <h2 className="text-xl font-bold text-green-600 mb-4">User List</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-center">
                <thead>
                  <tr className="bg-green-100 text-green-700">
                    <th className="p-3">Name</th>
                    <th className="p-3">Username</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id} className="hover:bg-green-50 transition">
                      <td className="p-3">{user.name}</td>
                      <td className="p-3">{user.username}</td>
                      <td className="p-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.role === 'admin' ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-700'}`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="p-3 space-x-2">
                        <button onClick={() => handleEdit(user)} className="p-2 rounded-full bg-blue-500 hover:bg-blue-700 text-white transition" title="Edit">
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDelete(user._id)} className="p-2 rounded-full bg-red-500 hover:bg-red-700 text-white transition" title="Delete">
                          <FaTrashAlt />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-8 text-gray-400">No users found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default AdminDashboard;
