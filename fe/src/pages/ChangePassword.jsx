import { useState } from 'react';
import { useChangePasswordMutation } from '../redux/apis/authApi';
import { FiLock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Mật khẩu mới không khớp!');
      return;
    }
    try {
      await changePassword({ currentPassword, newPassword }).unwrap();
      setSuccessMessage('Mật khẩu đã được thay đổi thành công!');
      setError('');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.message || 'Lỗi khi đổi mật khẩu');
      setSuccessMessage('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-200">
      <div className="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-lg border border-green-200">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-2 text-green-700">
          <FiLock className="inline-block" /> Đổi mật khẩu
        </h2>

        {error && (
          <div className="flex items-center gap-2 mb-4 text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
            <FiAlertCircle /> {error}
          </div>
        )}

        {successMessage && (
          <div className="flex items-center gap-2 mb-4 text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-2">
            <FiCheckCircle /> {successMessage}
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-6">
          <div>
            <label className="block text-lg font-semibold mb-2 text-gray-700">Mật khẩu hiện tại</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-green-400 focus:ring-2 focus:ring-green-100 transition"
              placeholder="Nhập mật khẩu hiện tại"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2 text-gray-700">Mật khẩu mới</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-green-400 focus:ring-2 focus:ring-green-100 transition"
              placeholder="Nhập mật khẩu mới"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2 text-gray-700">Xác nhận mật khẩu mới</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-lg focus:border-green-400 focus:ring-2 focus:ring-green-100 transition"
              placeholder="Xác nhận mật khẩu mới"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white py-3 rounded-lg text-xl font-semibold shadow-lg transition disabled:opacity-60"
            disabled={isLoading}
          >
            {isLoading ? 'Đang xử lý...' : 'Đổi mật khẩu'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
