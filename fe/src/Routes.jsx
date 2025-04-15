import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import Adidas from './pages/Adidas';
import ErrorPage from './pages/Error';


const RouteConfig = () => {
  return (
    <Routes>
      {/* Route chính */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/Adidas" element={<Adidas />} />
      <Route path="/*" element={<ErrorPage />} />

     
    </Routes>
  )
}

export default RouteConfig