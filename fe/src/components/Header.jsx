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
    <header className="w-full bg-secondary text-primary h-[100px] flex items-center px-10 border-b border-primary/30 shadow-md relative z-50">
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
            className="text-primary text-xl px-4 py-2 rounded-xl hover:bg-primary hover:text-secondary transition-all focus:outline-none focus:ring-2 focus:ring-primary"
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
            className="p-3 text-primary border border-primary/30 rounded-3xl pl-10 w-full focus:outline-none focus:ring-2 focus:ring-primary bg-white"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary/60" />
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
                className="flex items-center space-x-2 p-2 text-primary rounded-xl hover:bg-primary hover:text-secondary transition-all focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <FaUserCircle className="text-2xl" />
                <span>{userName}</span>
              </button>
              <Link
                to="/my-orders"
                title="My Orders"
                className="p-2 rounded-full hover:bg-primary hover:text-secondary transition-all focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <FaClipboardCheck className="text-xl" />
              </Link>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center space-x-2 p-2 text-primary rounded-xl hover:bg-primary hover:text-secondary transition-all focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <FaUserCircle className="text-2xl" />
              <span>Account</span>
            </Link>
          )}

          {/* Dropdown menu */}
          {userName && isMenuOpen && (
            <div className="absolute right-0 top-14 w-56 bg-white text-primary border border-primary/50 rounded-xl shadow-2xl text-left p-3 text-base z-50 space-y-1 animate-fade-in">
              {userRole === 'admin' && (
                <>
                  <Link
                    to="/admin/accounts"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 hover:bg-primary hover:text-secondary p-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <FaUserCog className="text-primary" /> Account Management
                  </Link>
                  <Link
                    to="/admin/products"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 hover:bg-primary hover:text-secondary p-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <FaBoxOpen className="text-primary" /> Product Management
                  </Link>
                  <Link
                    to="/admin/orders"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 hover:bg-primary hover:text-secondary p-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <FaClipboardList className="text-primary" /> Order Management
                  </Link>
                  <hr className="border-t border-primary/20 my-1" />
                </>
              )}
              <Link
                to="/change-password"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 hover:bg-primary hover:text-secondary p-2 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <FaKey className="text-primary" /> Change Password
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full text-left hover:bg-red-600 hover:text-secondary p-2 rounded-lg transition text-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          )}
        </div>

        {/* Cart */}
        <Link
          to="/cart"
          aria-label="View cart"
          className="relative flex items-center space-x-2 p-2 text-primary rounded-xl hover:bg-primary hover:text-secondary transition-all focus:outline-none focus:ring-2 focus:ring-primary"
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
