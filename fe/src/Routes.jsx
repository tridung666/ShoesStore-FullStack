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

import AdminDashboard from './pages/AdminDashboard';
import ProductManager from './pages/ProductManager';
import AllOrders from './pages/AllOrders';

import ErrorPage from './pages/Error';

const RouteConfig = () => {
  return (
    <Routes>
      {/* === Trang chính === */}
      <Route path="/" element={<Home />} />

      {/* === Auth === */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* === Sản phẩm người dùng xem === */}
      <Route path="/:brand" element={<BrandProducts />} />
      <Route path="/product/:id" element={<ProductDetail />} />

      {/* === Giỏ hàng & đơn hàng === */}
      <Route path="/cart" element={<Cart />} />
      <Route path="/order" element={<OrderForm />} />
      <Route path="/my-orders" element={<MyOrders />} />

      {/* === Admin === */}
      <Route path="/admin/account" element={<AdminDashboard />} />
      <Route path="/admin/products" element={<ProductManager />} />
      <Route path="/admin/orders" element={<AllOrders />} />

      {/* === 404 fallback === */}
      <Route path="/*" element={<ErrorPage />} />
    </Routes>
  );
};

export default RouteConfig;
