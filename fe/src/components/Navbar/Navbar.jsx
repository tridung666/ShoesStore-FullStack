import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="ml-10">
      <ul className="flex space-x-10 text-lg font-semibold">
        <NavItem title="Adidas" path="/adidas" />
        <NavItem title="Nike" path="/nike" />
        <NavItem title="Vans" path="/vans" />
      </ul>
    </nav>
  );
};

const NavItem = ({ title, path }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <li
      className="relative group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hiệu ứng gạch chân khi hover */}
      <span className="group-hover:underline cursor-pointer" onClick={() => navigate(path)}>{title}</span>

      {/* Submenu */}
      {isHovered && (
        <ul 
          className="absolute left-0 mt-2 w-24 bg-white text-black shadow-md rounded-md"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <li 
            className="px-4 py-2 hover:bg-gray-200 cursor-pointer" 
            onClick={() => navigate(`${path}/nam`)}>
            Nam
          </li>
          <li 
            className="px-4 py-2 hover:bg-gray-200 cursor-pointer" 
            onClick={() => navigate(`${path}/nu`)}>
            Nữ
          </li>
        </ul>
      )}
    </li>
  );
};

export default Navbar;