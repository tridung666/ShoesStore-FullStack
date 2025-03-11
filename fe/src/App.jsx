import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { BrowserRouter as Router } from 'react-router-dom'
import RouteConfig from './Routes'

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Header />
        <RouteConfig />
        <Footer />
      </Router>
    </div>
  )
}

export default App