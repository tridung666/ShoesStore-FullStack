import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { BrowserRouter as Router } from 'react-router-dom'
import RouteConfig from './Routes'
import { AuthProvider } from './context/AuthContext' // ✅ Import context

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <AuthProvider> {/* ✅ Bọc toàn bộ app */}
        <Router>
          <Header />
          <RouteConfig />
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  )
}

export default App
