import React from 'react'
import logo from '../assets/images/j97.png'
import Navbar from './Navbar/Navbar'
const Header = () => {
  return (
    <div className='flex bg-gray-800 text-white h-[100px] items-center '> 

        {/* LOGO */}
        <div className='ml-[10px]'>
            <img src={logo} alt="logo"  />
        </div>

        {/* Navbar */}
        <div>
            <Navbar />
        </div>
        


            
        
    </div>
  )
}

export default Header