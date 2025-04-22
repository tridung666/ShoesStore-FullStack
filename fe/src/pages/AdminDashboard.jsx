import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useCreateUserMutation,
  useUpdateUserMutation
} from '../redux/apis/authApi.jsx';
import PageWrapper from "../components/PageWrapper";


const AdminDashboard = () => {
  const [formData, setFormData] = useState({ name: '', username: '', password: '', role: 'user' });
  const [editingUserId, setEditingUserId] = useState(null);

  const { data: users = [], isLoading, error } = useGetAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [createUser] = useCreateUserMutation();
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
      password: '', // nhập lại mật khẩu
      role: user.role
    });
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id).unwrap();
    } catch (err) {
      alert("Xoá thất bại!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUserId) {
        await updateUser({ id: editingUserId, ...formData }).unwrap();
      } else {
        await createUser(formData).unwrap();
      }
      setFormData({ name: '', username: '', password: '', role: 'user' });
      setEditingUserId(null);
    } catch (err) {
      alert("Lưu thất bại!");
    }
  };

  if (isLoading) return <div className="p-10">Đang tải người dùng...</div>;
  if (error) return <div className="p-10 text-red-600">Không thể tải danh sách người dùng</div>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard - User Management</h1>

      {/* Menu admin */}
      <div className="flex space-x-6 mb-8 border-b pb-3">
        <button onClick={() => navigate('/admin')} className="text-blue-600 font-semibold hover:underline">User Management</button>
        <button onClick={() => navigate('/admin/products')} className="text-blue-600 font-semibold hover:underline">Product Management</button>
        <button onClick={() => navigate('/admin/orders')} className="text-blue-600 font-semibold hover:underline">Order Management</button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        <input name="name" value={formData.name} onChange={handleChange} placeholder="Name" required className="border p-2 w-full" />
        <input name="username" value={formData.username} onChange={handleChange} placeholder="Username" required className="border p-2 w-full" />
        <input name="password" value={formData.password} onChange={handleChange} placeholder="Password" required className="border p-2 w-full" />
        <select name="role" value={formData.role} onChange={handleChange} className="border p-2 w-full">
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="bg-green-600 text-white px-4 py-2">
          {editingUserId ? 'Update' : 'Add'} User
        </button>
      </form>

      {/* Table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Username</th>
            <th className="border p-2">Role</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.username}</td>
              <td className="border p-2">{user.role}</td>
              <td className="border p-2 space-x-2">
                <button onClick={() => handleEdit(user)} className="px-3 py-1 bg-blue-500 text-white">Edit</button>
                <button onClick={() => handleDelete(user._id)} className="px-3 py-1 bg-red-500 text-white">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
