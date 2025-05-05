import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/HomePage/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import BrandProducts from './pages/BrandProducts';
import ProductDetail from './pages/ProductDetail';

import Cart from './pages/Cart';
import OrderForm from './pages/OrderForm';
import MyOrders from './pages/MyOrders';

import AdminDashboard from './pages/admin/AdminAccount';
import ProductManager from './pages/admin/AdminProducts';
import AllOrders from './pages/admin/AdminOrders';
import ChangePassword from './pages/ChangePassword'; // Import trang mới

import ErrorPage from './pages/Error';

// ✅ Import component phân quyền
import PrivateRouteRole from './components/PrivateRouteRole';

const RouteConfig = () => {
  return (
    <Routes>
      {/* === Trang chính === */}
      <Route path="/" element={<Home />} />

      {/* === Auth === */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/change-password" element={<ChangePassword />} />

      {/* === Sản phẩm người dùng xem === */}
      <Route path="/:brand" element={<BrandProducts />} />
      <Route path="/product/:id" element={<ProductDetail />} />

      {/* === Giỏ hàng & đơn hàng === */}
      <Route path="/cart" element={<Cart />} />
      <Route path="/order" element={<OrderForm />} />
      <Route
        path="/my-orders"
        element={
          <PrivateRouteRole>
              <MyOrders />
          </PrivateRouteRole>
      }
/>

      {/* === Admin === */}
      <Route
        path="/admin/account"
        element={
          <PrivateRouteRole allowedRoles={['admin']}>
            <AdminDashboard />
          </PrivateRouteRole>
        }
      />
      <Route
        path="/admin/products"
        element={
          <PrivateRouteRole allowedRoles={['admin']}>
            <ProductManager />
          </PrivateRouteRole>
        }
      />
      <Route
        path="/admin/orders"
        element={
          <PrivateRouteRole allowedRoles={['admin']}>
            <AllOrders />
          </PrivateRouteRole>
        }
      />

      {/* === 404 fallback === */}
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
};

export default RouteConfig;
