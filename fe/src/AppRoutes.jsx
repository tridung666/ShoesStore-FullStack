import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";

const AppRoutes = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<h1>Home Page</h1>} />
        <Route path="/adidas" element={<h1>Adidas Page</h1>} />
        <Route path="/adidas/nam" element={<h1>Adidas - Nam</h1>} />
        <Route path="/adidas/nu" element={<h1>Adidas - Nữ</h1>} />
        <Route path="/nike" element={<h1>Nike Page</h1>} />
        <Route path="/nike/nam" element={<h1>Nike - Nam</h1>} />
        <Route path="/nike/nu" element={<h1>Nike - Nữ</h1>} />
        <Route path="/vans" element={<h1>Vans Page</h1>} />
        <Route path="/vans/nam" element={<h1>Vans - Nam</h1>} />
        <Route path="/vans/nu" element={<h1>Vans - Nữ</h1>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
