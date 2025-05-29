import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice.jsx';
import { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/images/J97.png';
import { FiSearch } from 'react-icons/fi';
import {
  FaUserCircle,
  FaShoppingCart,
  FaBoxOpen,
  FaClipboardList,
  FaKey,
  FaSignOutAlt,
  FaClipboardCheck,
  FaUserCog
} from 'react-icons/fa';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  // Cập nhật selector lấy tổng số lượng trong cartItems
  const cartItemsCount = useSelector((state) =>
    state.cart.cartItems.reduce((total, item) => total + item.quantity, 0)
  );
  const userName = user?.name;
  const userRole = user?.role;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();

  // Đóng menu khi click ngoài
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    setIsMenuOpen(false);
    navigate('/login');
  };

  return (
    <header className="w-full bg-gray-100 text-black h-[100px] flex items-center px-10 border-b border-gray-200 shadow-md relative z-50">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/" aria-label="Homepage">
          <img src={logo} alt="J97 Logo" className="h-16 cursor-pointer" />
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-grow justify-center space-x-20 font-semibold ml-20">
        {['Adidas', 'Nike', 'Vans'].map((brand) => (
          <Link
            key={brand}
            to={`/${brand}`}
            className="text-black text-xl px-4 py-2 rounded-xl hover:bg-primary hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {brand}
          </Link>
        ))}
      </nav>

      {/* Search + User + Cart */}
      <div className="flex items-center space-x-6">
        {/* Search */}
        <div className="relative w-[250px]">
          <input
            type="text"
            placeholder="Search"
            aria-label="Search products"
            className="p-3 text-black border border-gray-300 rounded-3xl pl-10 w-full focus:outline-none focus:ring-2 focus:ring-primary bg-white"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>

        {/* User Info & Dropdown */}
        <div className="flex space-x-4 relative" ref={menuRef}>
          {userName ? (
            <div className="flex items-center space-x-2">
              <button
                aria-haspopup="true"
                aria-expanded={isMenuOpen}
                aria-label="User menu"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-2 p-2 text-black rounded-xl hover:bg-primary hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <FaUserCircle className="text-2xl" />
                <span>{userName}</span>
              </button>
              <Link
                to="/my-orders"
                title="Đơn hàng của tôi"
                className="p-2 rounded-full hover:bg-primary hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <FaClipboardCheck className="text-xl" />
              </Link>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center space-x-2 p-2 text-black rounded-xl hover:bg-primary hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <FaUserCircle className="text-2xl" />
              <span>Account</span>
            </Link>
          )}

          {/* Dropdown menu */}
          {userName && isMenuOpen && (
            <div className="absolute right-0 top-14 w-56 bg-white text-black border border-black rounded-xl shadow-2xl text-left p-3 text-base z-50 space-y-1 animate-fade-in">
              {userRole === 'admin' && (
                <>
                  <Link
                    to="/admin/account"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 hover:bg-primary hover:text-white p-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <FaUserCog className="text-green-600" /> Quản lý tài khoản
                  </Link>
                  <Link
                    to="/admin/products"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 hover:bg-primary hover:text-white p-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <FaBoxOpen className="text-green-600" /> Quản lý sản phẩm
                  </Link>
                  <Link
                    to="/admin/orders"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 hover:bg-primary hover:text-white p-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <FaClipboardList className="text-green-600" /> Quản lý đơn hàng
                  </Link>
                  <hr className="border-t border-gray-200 my-1" />
                </>
              )}
              <Link
                to="/change-password"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 hover:bg-primary hover:text-white p-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <FaKey className="text-green-600" /> Đổi mật khẩu
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full text-left hover:bg-red-500 hover:text-white p-2 rounded-lg transition text-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                <FaSignOutAlt /> Đăng xuất
              </button>
            </div>
          )}
        </div>

        {/* Cart */}
        <Link
          to="/cart"
          aria-label="View cart"
          className="relative flex items-center space-x-2 p-2 text-black rounded-xl hover:bg-primary hover:text-white transition-all focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <FaShoppingCart className="text-2xl" />
          {cartItemsCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full text-xs px-1.5 py-0.5 select-none">
              {cartItemsCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;
