import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../redux/apis/authApi";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice"; // ✅
import PageWrapper from "../components/PageWrapper";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginUser] = useLoginUserMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ username, password }).unwrap();
      dispatch(loginSuccess(res)); // Cập nhật redux
      localStorage.setItem("token", res.token);

      if (res.user.role === "admin") {
        navigate("/");
      } else {
        navigate("/");
      }
    } catch (err) {
      setErrorMessage(err?.data?.message || "Login failed");
    }
  };

  return (
    <PageWrapper>
      <div className="min-h-screen flex flex-col justify-center bg-white px-12 py-28">
        <h2 className="text-5xl font-bold text-center text-black mb-8">User Login</h2>
        <p className="text-xl text-center text-gray-600 mb-12">
          Access your account to shop our sneakers.
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
          <div className="mb-8">
            <label className="block text-2xl text-gray-700 mb-3">Username*</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-6 py-4 border border-gray-300 rounded-lg text-xl focus:outline-none focus:ring-4 focus:ring-gray-500 text-black"
              placeholder="Enter your username"
              required
            />
          </div>

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

          {errorMessage && (
            <div className="mb-8 text-red-500 text-xl text-center">{errorMessage}</div>
          )}

          <button
            type="submit"
            className="w-full bg-primary text-white py-4 rounded-lg hover:bg-green-900 text-2xl font-semibold"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-12 text-xl">
          Don't have an account?{" "}
          <Link to="/register" className="text-black font-semibold">
            Register
          </Link>
        </p>

        <p className="text-center text-gray-500 mt-16 text-lg">
          Copyright © J97 Store
        </p>
      </div>
    </PageWrapper>
  );
};

export default Login;
