import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";

const Register = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(name, username, password);
      navigate("/login");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center bg-white px-12 py-28">
      <h2 className="text-5xl font-bold text-center text-black mb-8">Create Account</h2>
      <p className="text-xl text-center text-gray-600 mb-12">
        Join us and be a part of our sneaker community!
      </p>

      <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
        <div className="mb-8">
          <label htmlFor="name" className="block text-2xl text-gray-700 mb-3">Full Name*</label>
          <input
            type="text"
            id="name"
            className="w-full px-6 py-4 border border-gray-300 rounded-lg text-xl focus:outline-none focus:ring-4 focus:ring-gray-500 text-black"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-8">
          <label htmlFor="username" className="block text-2xl text-gray-700 mb-3">Username*</label>
          <input
            type="text"
            id="username"
            className="w-full px-6 py-4 border border-gray-300 rounded-lg text-xl focus:outline-none focus:ring-4 focus:ring-gray-500 text-black"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-8">
          <label htmlFor="password" className="block text-2xl text-gray-700 mb-3">Password*</label>
          <input
            type="password"
            id="password"
            className="w-full px-6 py-4 border border-gray-300 rounded-lg text-xl focus:outline-none focus:ring-4 focus:ring-gray-500 text-black"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {errorMessage && (
          <div className="mb-8 text-red-500 text-xl text-center">{errorMessage}</div>
        )}

        <button type="submit" className="w-full bg-[#426B1F] text-white py-4 rounded-lg hover:bg-green-800 text-2xl font-semibold">
          Create Account
        </button>
      </form>

      <p className="text-center text-gray-600 mt-12 text-xl">
        Already have an account? <Link to="/login" className="text-black font-semibold">Login</Link>
      </p>

      <p className="text-center text-gray-500 mt-16 text-lg">Copyright © J97 Store</p>
    </div>
  );
};

export default Register;
