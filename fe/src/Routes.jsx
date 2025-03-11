import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

const RouteConfig = () => {
  return (
    <Routes>
      {/* Route chính */}
      <Route path="/" element={<Home />} />

      {/* Route cho trang About
      <Route path="/about" element={<About />} />

      Route cho trang chi tiết sản phẩm với tham số id
      <Route path="/product/:id" element={<ProductDetail />} />

      Route cho trang lỗi 404
      <Route path="*" element={<ErrorPage />} /> */}
    </Routes>
  )
}

export default RouteConfig