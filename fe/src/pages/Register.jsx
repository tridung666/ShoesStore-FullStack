import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../redux/apis/authApi"; // ✅ import đúng
import PageWrapper from "../components/PageWrapper";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const [registerUser] = useRegisterUserMutation(); // ✅ định nghĩa mutation

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ name, username, password }).unwrap();
      navigate("/login");
    } catch (err) {
      setErrorMessage(err?.data?.message || "Registration failed");
    }
  };

  return (
    <PageWrapper>
      <div className="min-h-screen flex flex-col justify-center bg-white px-12 py-28">
        <h2 className="text-5xl font-bold text-center text-black mb-8">Create Account</h2>
        <p className="text-xl text-center text-gray-600 mb-12">
          Join us and be a part of our sneaker community!
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
          <div className="mb-8">
            <label className="block text-2xl text-gray-700 mb-3">Full Name*</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-6 py-4 border border-gray-300 rounded-lg text-xl"
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="mb-8">
            <label className="block text-2xl text-gray-700 mb-3">Username*</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-6 py-4 border border-gray-300 rounded-lg text-xl"
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
              className="w-full px-6 py-4 border border-gray-300 rounded-lg text-xl"
              placeholder="Enter your password"
              required
            />
          </div>

          {errorMessage && (
            <div className="mb-8 text-red-500 text-xl text-center">{errorMessage}</div>
          )}

          <button
            type="submit"
            className="w-full bg-[#426B1F] text-white py-4 rounded-lg hover:bg-green-800 text-2xl font-semibold"
          >
            Create Account
          </button>
        </form>

        <p className="text-center text-gray-600 mt-12 text-xl">
          Already have an account?{" "}
          <Link to="/login" className="text-black font-semibold">
            Login
          </Link>
        </p>

        <p className="text-center text-gray-500 mt-16 text-lg">
          Copyright © J97 Store
        </p>
      </div>
    </PageWrapper>
  );
};

export default Register;
