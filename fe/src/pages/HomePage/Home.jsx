import React from 'react'
import Banner from '../../assets/images/Banner.png'
import BestSellers from './BestSellers'

const Home = () => {

  

  


  return (
    <div className='flex flex-col bg-white items-center justify-center min-h-screen'>
        {/* Tiêu đề và Banner */}
        {/* <section className='flex flex-col items-center text-center '>
            <h1 className='text-[#426B1F] text-5xl font-semibold pt-60 '>Step Up Your Style with Our <br /> Sneakers</h1> <br />
            <p className='text-3xl p-40'>Discover the freshest kicks in our latest collection. Elevate your sneaker game and express your <br /> unique style today!</p>
            
        </section> */}

<div className="relative w-full group">
  {/* Hình ảnh */}
  <img 
    src={Banner} 
    alt="Banner" 
    className="w-full pt-[100px] transition-all duration-300 group-hover:brightness-50"
  />

  {/* Chữ hiển thị khi hover */}
  <h1 
    className="absolute inset-0 flex items-center justify-center text-white text-5xl font-semibold text-center 
    opacity-0 transition-all duration-300 group-hover:opacity-100"
  >
    Step Up Your Style with Our <br /> Sneakers
  </h1>
</div>

   {/* Hiển thị Best Sellers */}
   <BestSellers />

        
    


    </div>
  )
}

export default Home