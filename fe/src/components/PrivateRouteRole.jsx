import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRouteRole = ({ allowedRoles, children }) => {
  const user = useSelector((state) => state.auth.user);

  // ✅ Nếu chưa đăng nhập
  if (!user) return <Navigate to="/login" />;

  // ✅ Kiểm tra nếu `allowedRoles` không undefined và kiểm tra vai trò
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateRouteRole;
