import React from 'react'
import Header from '../Components/Header/Header'
import NowShowing from '../Components/Home/Now Showing/NowShowing'

const Home = () => {
  return (
    <>
      <Header />
      <main className='h-screen flex flex-col items-center bg-[#fff1e6] dark:bg-[#111111] transition-bg-color duration-500'>
        <NowShowing />
      </main>
    </>
  )
}

export default Home
