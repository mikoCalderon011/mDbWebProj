import React from 'react'
import Header from '../Components/Header/Header'
import NowShowing from '../Components/Home/Now Showing/NowShowing'
import FreshPicks from '../Components/Home/Fresh Picks/FreshPicks'

const Home = () => {
  return (
    <>
      <Header />
      <main className='h-screen flex flex-col items-center gap-[4.3125rem] bg-[#fff1e6] dark:bg-[#111111] transition-bg-color duration-500'>
        <NowShowing />
        <FreshPicks />
      </main>
    </>
  )
}

export default Home
