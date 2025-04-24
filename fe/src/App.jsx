import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import RouteConfig from './Routes';
import { AnimatePresence } from 'framer-motion';

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      {/* 👇 RouteConfig cần có key để nhận diện trang */}
      <RouteConfig key={location.pathname} />
    </AnimatePresence>
  );
};

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
        <Router>
          <Header />
          <AnimatedRoutes />
          <Footer />
        </Router>
    </div>
  );
};

export default App;
