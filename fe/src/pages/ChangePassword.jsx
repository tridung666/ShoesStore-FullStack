import { useState } from 'react';
import { useChangePasswordMutation } from '../redux/apis/authApi';  // Import hook RTK
// const { useChangePasswordMutation } = ...; 

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');  // Thêm state để lưu thông báo thành công
  const [changePassword, { isLoading }] = useChangePasswordMutation(); // Dùng hook từ RTK

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    // Kiểm tra sự khớp của mật khẩu mới và mật khẩu xác nhận
    if (newPassword !== confirmPassword) {
      setError('Mật khẩu mới không khớp!');
      return;
    }

    try {
      // Gọi API thay đổi mật khẩu
      await changePassword({ currentPassword, newPassword }).unwrap();

      // Cập nhật trạng thái thông báo thành công
      setSuccessMessage('Mật khẩu đã được thay đổi thành công!');
      setError(''); // Reset thông báo lỗi nếu có

      // Clear form input after success
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      // Hiển thị lỗi nếu có
      setError(err.message || 'Lỗi khi đổi mật khẩu');
      setSuccessMessage('');  // Clear success message if error occurs
    }
  };

  return (
    <div className="p-10 max-w-lg mx-auto">
      <h2 className="text-3xl font-bold mb-6">Change Password</h2>
      
      {/* Hiển thị thông báo lỗi nếu có */}
      {error && <div className="text-red-600">{error}</div>}

      {/* Hiển thị thông báo thành công nếu có */}
      {successMessage && <div className="text-green-600">{successMessage}</div>}

      <form onSubmit={handlePasswordChange} className="space-y-6">
        <div>
          <label className="block text-xl">Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full p-4 border rounded-lg"
            placeholder="Enter your current password"
            required
          />
        </div>

        <div>
          <label className="block text-xl">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-4 border rounded-lg"
            placeholder="Enter new password"
            required
          />
        </div>

        <div>
          <label className="block text-xl">Confirm New Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-4 border rounded-lg"
            placeholder="Confirm new password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-xl"
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Change Password'}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
