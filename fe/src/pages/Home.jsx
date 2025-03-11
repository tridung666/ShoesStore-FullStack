import React from 'react'
import Banner from '../assets/images/Banner.png'

const Home = () => {
  return (
    <div className='flex flex-col bg-white items-center justify-center min-h-screen'>
        {/* Tiêu đề và Banner */}
        <section className='flex flex-col items-center text-center '>
            <h1 className='text-[#426B1F] text-8xl font-semibold pt-60 '>Step Up Your Style with Our <br /> Sneakers</h1> <br />
            <p className='text-3xl p-40'>Discover the freshest kicks in our latest collection. Elevate your sneaker game and express your <br /> unique style today!</p>
            
        </section>

        <img src={Banner} alt="Banner" className='w-full' />
    


    </div>
  )
}

export default Home