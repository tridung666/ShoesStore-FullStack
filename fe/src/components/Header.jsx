import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/images/J97.png";
import { FiSearch } from "react-icons/fi";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";

const Header = () => {
  const { userName, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/login");
  };

  return (
    <div className="w-full bg-white text-black h-[100px] flex items-center px-10 border-gray-200 shadow-md">
      <div className="flex items-center">
        <img src={logo} alt="logo" className="h-16" />
      </div>

      <nav className="flex flex-grow justify-center space-x-20 font-semibold ml-20">
        <a href="/adidas" className="text-black text-xl hover:text-gray-600 transition-all">Adidas</a>
        <a href="/nike" className="text-black text-xl hover:text-gray-600 transition-all">Nike</a>
        <a href="/vans" className="text-black text-xl hover:text-gray-600 transition-all">Vans</a>
      </nav>

      <div className="flex items-center space-x-6">
        <div className="relative w-[250px]">
          <input
            type="text"
            placeholder="Search"
            className="p-3 text-black border border-gray-300 rounded-3xl pl-10 w-full focus:outline-none focus:ring-1 focus:ring-gray-400 bg-white"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>

        <div className="flex space-x-4 relative">
          {userName ? (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex items-center space-x-2 p-2 text-black hover:text-gray-600 transition-all"
            >
              <FaUserCircle className="text-2xl" />
              <span>{userName}</span>
            </button>
          ) : (
            <Link to="/login" className="flex items-center space-x-2 p-2 text-black hover:text-gray-600 transition-all">
              <FaUserCircle className="text-2xl" />
              <span>Account</span>
            </Link>
          )}

          {userName && isMenuOpen && (
            <button
              onClick={handleLogout}
              className="absolute right-0 top-14 w-32 bg-white text-black border border-gray-300 rounded shadow-lg text-left p-2 text-sm z-50"
            >
              Log out
            </button>
          )}
        </div>

        <button className="flex items-center space-x-2 p-2 text-black hover:text-gray-600 transition-all">
          <FaShoppingCart className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default Header;
