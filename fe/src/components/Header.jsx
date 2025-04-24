import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice.jsx';
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/images/J97.png';
import { FiSearch } from 'react-icons/fi';
import {
  FaUserCircle,
  FaShoppingCart,
  FaTachometerAlt,
  FaBoxOpen,
  FaClipboardList,
  FaKey,
  FaSignOutAlt,
  FaClipboardCheck
} from 'react-icons/fa';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const userName = user?.name;
  const userRole = user?.role;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
    navigate('/login');
  };

  return (
    <div className="w-full bg-white text-black h-[100px] flex items-center px-10 border-gray-200 shadow-md">
      <div className="flex items-center">
        <Link to="/">
          <img src={logo} alt="logo" className="h-16 cursor-pointer" />
        </Link>
      </div>

      <nav className="flex flex-grow justify-center space-x-20 font-semibold ml-20">
        <Link to="/Adidas" className="text-black text-xl px-4 py-2 rounded-xl hover:bg-primary hover:text-white transition-all">Adidas</Link>
        <Link to="/Nike" className="text-black text-xl px-4 py-2 rounded-xl hover:bg-primary hover:text-white transition-all">Nike</Link>
        <Link to="/Vans" className="text-black text-xl px-4 py-2 rounded-xl hover:bg-primary hover:text-white transition-all">Vans</Link>
      </nav>

      <div className="flex items-center space-x-6">
        <div className="relative w-[250px]">
          <input
            type="text"
            placeholder="Search"
            className="p-3 text-black border border-gray-300 rounded-3xl pl-10 w-full focus:outline-none focus:ring-2 focus:ring-primary bg-white"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>

        <div className="flex space-x-4 relative">
          {userName ? (
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-2 p-2 text-black rounded-xl hover:bg-primary hover:text-white transition-all"
              >
                <FaUserCircle className="text-2xl" />
                <span>{userName}</span>
              </button>
              <Link
                to="/my-orders"
                className="p-2 rounded-full hover:bg-primary hover:text-white transition-all"
                title="Đơn hàng của tôi"
              >
                <FaClipboardCheck className="text-xl " />
              </Link>
            </div>
          ) : (
            <Link to="/login" className="flex items-center space-x-2 p-2 text-black rounded-xl hover:bg-primary hover:text-white transition-all">
              <FaUserCircle className="text-2xl" />
              <span>Account</span>
            </Link>
          )}

          {userName && isMenuOpen && (
            <div className="absolute right-0 top-14 w-56 bg-white text-black border border-green-300 rounded-xl shadow-2xl text-left p-3 text-base z-50 space-y-1 animate-fade-in">
              {userRole === 'admin' && (
                <>
                  <Link
                    to="/admin/account"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 hover:bg-primary hover:text-white p-2 rounded-lg transition"
                  >
                    <FaTachometerAlt className="text-green-600" /> Admin Dashboard
                  </Link>
                  <Link
                    to="/admin/products"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 hover:bg-primary hover:text-white p-2 rounded-lg transition"
                  >
                    <FaBoxOpen className="text-green-600" /> Quản lý sản phẩm
                  </Link>
                  <Link
                    to="/admin/orders"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 hover:bg-primary hover:text-white p-2 rounded-lg transition"
                  >
                    <FaClipboardList className="text-green-600" /> Quản lý đơn hàng
                  </Link>
                  <hr className="border-t border-gray-200 my-1" />
                </>
              )}
              <Link
                to="/change-password"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 hover:bg-primary hover:text-white p-2 rounded-lg transition"
              >
                <FaKey className="text-green-600" /> Đổi mật khẩu
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full text-left hover:bg-red-500 hover:text-white p-2 rounded-lg transition text-red-600"
              >
                <FaSignOutAlt /> Đăng xuất
              </button>
            </div>
          )}
        </div>

        <Link to="/cart" className="flex items-center space-x-2 p-2 text-black rounded-xl hover:bg-primary hover:text-white transition-all">
          <FaShoppingCart className="text-2xl" />
        </Link>
      </div>
    </div>
  );
};

export default Header;
