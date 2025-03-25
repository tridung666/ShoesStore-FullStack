import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState(""); // Đổi từ email thành username
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // Hàm xử lý đăng nhập
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }), // Gửi username thay vì email
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Lưu token và tên người dùng vào localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("userName", data.user.name); // Lưu tên người dùng
  
        // Điều hướng đến trang Dashboard hoặc trang chính
        navigate("/");
      } else {
        setErrorMessage(data.message || "Something went wrong");
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again.");
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col justify-center bg-white px-12 py-28">
      <h2 className="text-5xl font-bold text-center text-black mb-8">User Login</h2>
      <p className="text-xl text-center text-gray-600 mb-12">
        Access your account to shop our sneakers.
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
        {/* Username */}
        <div className="mb-8">
          <label className="block text-2xl text-gray-700 mb-3">Username*</label>
          <input
            type="text"
            value={username} // Đổi từ email thành username
            onChange={(e) => setUsername(e.target.value)} // Đổi từ setEmail thành setUsername
            className="w-full px-6 py-4 border border-gray-300 rounded-lg text-xl focus:outline-none focus:ring-4 focus:ring-gray-500 text-black"
            placeholder="Enter your username"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-8">
          <label className="block text-2xl text-gray-700 mb-3">Password*</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-6 py-4 border border-gray-300 rounded-lg text-xl focus:outline-none focus:ring-4 focus:ring-gray-500 text-black"
            placeholder="Enter your password"
            required
          />
        </div>

        {/* Hiển thị lỗi nếu có */}
        {errorMessage && (
          <div className="mb-8 text-red-500 text-xl text-center">{errorMessage}</div>
        )}

        <button type="submit" className="w-full bg-[#426B1F] text-white py-4 rounded-lg hover:bg-green-800 text-2xl font-semibold">
          Login
        </button>
      </form>

      <p className="text-center text-gray-600 mt-12 text-xl">
        Don't have an account? <Link to="/register" className="text-black font-semibold">Register</Link>
      </p>

      <p className="text-center text-gray-500 mt-16 text-lg">Copyright © J97 Store</p>
    </div>
  );
};

export default Login;
