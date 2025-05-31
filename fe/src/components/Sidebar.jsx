// File: src/components/Sidebar.jsx

import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaUsers, FaBoxOpen, FaClipboardList, FaBars, FaTimes } from 'react-icons/fa';

const menus = [
  { name: 'Accounts', icon: <FaUsers />, path: '/admin/accounts' },
  { name: 'Products', icon: <FaBoxOpen />, path: '/admin/products' },
  { name: 'Orders', icon: <FaClipboardList />, path: '/admin/orders' },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // mobile toggle
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile topbar with toggle */}
      <div className="md:hidden flex items-center justify-between bg-primary text-secondary p-4">
        <button
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
          className="text-2xl focus:outline-none focus:ring-2 focus:ring-secondary"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
        <div className="text-lg font-bold select-none">Admin Panel</div>
      </div>

      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={toggleSidebar}
      />

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen w-64 bg-secondary border-r border-primary z-50
          transform md:translate-x-0
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:static md:translate-x-0
          flex flex-col
        `}
      >
        <div className="flex items-center justify-between p-6 border-b border-primary">
          <h2 className="text-2xl font-extrabold text-primary select-none">Admin Panel</h2>
          <button
            onClick={toggleSidebar}
            aria-label="Close sidebar"
            className="md:hidden text-primary hover:text-accent focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <FaTimes />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto mt-4">
          {menus.map(({ name, icon, path }) => {
            const isActive = location.pathname === path;
            return (
              <button
                key={name}
                onClick={() => {
                  navigate(path);
                  setIsOpen(false); // close sidebar mobile on select
                }}
                className={`flex items-center gap-3 w-full px-6 py-3 text-left transition
                  ${
                    isActive
                      ? 'bg-primary font-semibold text-secondary'
                      : 'text-primary hover:bg-primary/20 hover:text-accent'
                  }
                  focus:outline-none focus:ring-2 focus:ring-accent
                `}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className="text-lg">{icon}</span>
                <span>{name}</span>
              </button>
            );
          })}
        </nav>

        <footer className="p-6 border-t border-primary text-primary text-sm select-none">
          © 2025 Your Company
        </footer>
      </aside>
    </>
  );
};

export default Sidebar;
