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
      setError('New password and confirmation do not match!');
      setSuccessMessage('');
      return;
    }
    try {
      await changePassword({ currentPassword, newPassword }).unwrap();
      setSuccessMessage('Password changed successfully!');
      setError('');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.data?.message || err.error || 'Error changing password');
      setSuccessMessage('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary">
      <div className="bg-secondary shadow-lg rounded-2xl p-10 w-full max-w-lg border border-primary/40">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-2 text-primary">
          <FiLock className="inline-block" /> Change Password
        </h2>

        {error && (
          <div className="flex items-center gap-2 mb-4 text-red-700 bg-red-100 border border-red-300 rounded-lg px-4 py-2">
            <FiAlertCircle /> {error}
          </div>
        )}

        {successMessage && (
          <div className="flex items-center gap-2 mb-4 text-primary bg-primary/20 border border-primary/40 rounded-lg px-4 py-2">
            <FiCheckCircle /> {successMessage}
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-6">
          <div>
            <label className="block text-lg font-semibold mb-2 text-primary">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full p-4 border-2 border-primary/30 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/30 transition bg-white text-primary"
              placeholder="Enter current password"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2 text-primary">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-4 border-2 border-primary/30 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/30 transition bg-white text-primary"
              placeholder="Enter new password"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-2 text-primary">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-4 border-2 border-primary/30 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/30 transition bg-white text-primary"
              placeholder="Confirm new password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary hover:bg-green-900 text-white py-3 rounded-lg text-xl font-semibold shadow-lg transition disabled:opacity-60"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Change Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
