// File: src/pages/admin/AdminAccount.jsx

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar.jsx';

import {
  useGetAllUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useCreateUserByAdminMutation,
} from '../../redux/apis/authApi.jsx';
import PageWrapper from '../../components/PageWrapper.jsx';

import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';

const AdminAccount = () => {
  const [formData, setFormData] = useState({ name: '', username: '', password: '', role: 'user' });
  const [editingUserId, setEditingUserId] = useState(null);

  const { data: users = [], isLoading, error } = useGetAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [createUserByAdmin, { isLoading: isCreating }] = useCreateUserByAdminMutation();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleEdit = (user) => {
    setEditingUserId(user._id);
    setFormData({ name: user.name, username: user.username, password: '', role: user.role });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xoá người dùng này?")) return;
    try {
      await deleteUser(id).unwrap();
      toast.success("Xoá người dùng thành công!");
    } catch (err) {
      toast.error("Xoá thất bại!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUserId) {
        await updateUser({ id: editingUserId, ...formData }).unwrap();
        toast.success("Cập nhật người dùng thành công!");
      } else {
        await createUserByAdmin(formData).unwrap();
        toast.success("Tạo người dùng mới thành công!");
      }
      setFormData({ name: '', username: '', password: '', role: 'user' });
      setEditingUserId(null);
    } catch (err) {
      toast.error("Lưu thất bại! " + (err.data?.message || err.error));
    }
  };

  return (
  <PageWrapper>
    <div className="flex min-h-screen bg-secondary">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header / Topbar */}
        <header className="flex items-center justify-between bg-white shadow-md px-8 h-16 border-b border-primary">
          <h1 className="text-2xl font-bold text-primary select-none">Admin Dashboard</h1>
          <button
            onClick={() => navigate('/')}
            className="text-primary hover:text-accent transition rounded-md px-3 py-2 text-sm font-medium"
          >
            View Site
          </button>
        </header>

        {/* Content */}
        <main className="p-8 overflow-auto">
          {/* Form Card */}
          <section className="bg-white rounded-xl shadow-lg p-8 mb-10 max-w-3xl mx-auto border border-primary/30">
            <h2 className="text-3xl font-semibold text-primary mb-6 select-none">
              {editingUserId ? 'Edit User Account' : 'Add New User'}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border border-primary/50 rounded-lg p-3 focus:ring-2 focus:ring-accent focus:outline-none transition"
              />
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                className="border border-primary/50 rounded-lg p-3 focus:ring-2 focus:ring-accent focus:outline-none transition"
              />
              <input
                type="password"
                name="password"
                placeholder={editingUserId ? 'Leave blank to keep current password' : 'Password'}
                value={formData.password}
                onChange={handleChange}
                {...(editingUserId ? {} : { required: true })}
                className="border border-primary/50 rounded-lg p-3 focus:ring-2 focus:ring-accent focus:outline-none transition md:col-span-2"
              />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="border border-primary/50 rounded-lg p-3 focus:ring-2 focus:ring-accent focus:outline-none transition md:col-span-2"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <div className="md:col-span-2 flex justify-end">
                <button
                  type="submit"
                  disabled={isCreating}
                  className="bg-primary hover:bg-accent disabled:opacity-70 text-secondary px-8 py-3 rounded-lg font-semibold transition"
                >
                  {editingUserId ? 'Update User' : isCreating ? 'Creating...' : 'Add User'}
                </button>
              </div>
            </form>
          </section>

          {/* Users Table Card */}
          <section className="bg-white rounded-xl shadow-lg p-6 max-w-6xl mx-auto border border-primary/30">
            <h2 className="text-2xl font-semibold text-primary mb-6 select-none">Users List</h2>

            {isLoading ? (
              <div className="text-center py-10 text-primary/60 select-none">Loading users...</div>
            ) : error ? (
              <div className="text-center py-10 text-red-600 select-none">Failed to load users.</div>
            ) : users.length === 0 ? (
              <div className="text-center py-10 text-primary/40 select-none">No users found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-left border-collapse border border-primary/30 rounded-lg">
                  <thead className="bg-primary/10 text-primary select-none">
                    <tr>
                      <th className="p-4 border border-primary/30 rounded-tl-lg">Name</th>
                      <th className="p-4 border border-primary/30">Username</th>
                      <th className="p-4 border border-primary/30">Role</th>
                      <th className="p-4 border border-primary/30 rounded-tr-lg text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr
                        key={user._id}
                        className="border border-primary/30 hover:bg-primary/20 transition cursor-pointer"
                      >
                        <td className="p-4">{user.name}</td>
                        <td className="p-4">{user.username}</td>
                        <td className="p-4">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                              user.role === 'admin'
                                ? 'bg-primary/30 text-primary'
                                : 'bg-gray-200 text-gray-700'
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="p-4 text-center space-x-3">
                          <button
                            onClick={() => handleEdit(user)}
                            title="Edit User"
                            className="inline-flex items-center justify-center p-2 rounded-md bg-accent hover:bg-indigo-700 text-secondary transition"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(user._id)}
                            title="Delete User"
                            className="inline-flex items-center justify-center p-2 rounded-md bg-red-600 hover:bg-red-700 text-white transition"
                          >
                            <FaTrashAlt />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  </PageWrapper>
  );
};

export default AdminAccount;
