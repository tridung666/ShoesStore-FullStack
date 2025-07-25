import React from 'react'
import Banner from '../../assets/images/Banner.png'
import PageWrapper from '../../components/PageWrapper';
import AboutUs from './AboutUs';

const Home = () => {
  // Lấy tên người dùng từ localStorage
  const userName = localStorage.getItem("userName");

  return (
    <PageWrapper>
    <div className='flex flex-col bg-white items-center justify-center min-h-0'>
      {/* Hiển thị tên người dùng nếu có */}
      {/* {userName && (
        <div className="text-center mt-8">
          <h2 className="text-xl font-semibold text-gray-700">Welcome, {userName}!</h2>
        </div>
      )} */}

      {/* Hình ảnh Banner */}
      <div className="relative w-full group">
        <img 
          src={Banner} 
          alt="Banner" 
          className="w-full transition-all duration-300 group-hover:brightness-50"
        />

        <h1 
          className="absolute inset-0 flex items-center justify-center text-white text-5xl font-semibold text-center 
          opacity-0 transition-all duration-300 group-hover:opacity-100"
        >
          Step Up Your Style with Our <br /> Sneakers
        </h1>
      </div>
          {/*Another Banner */}
          <AboutUs />
      
    </div>
    </PageWrapper>
  )
}

export default Home;
