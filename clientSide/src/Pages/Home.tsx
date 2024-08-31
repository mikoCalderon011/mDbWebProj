import React from 'react'
import Header from '../Components/Header/Header'
import NowShowing from '../Components/Home/Now Showing/NowShowing'
import FreshPicks from '../Components/Home/Fresh Picks/FreshPicks'
import Popular from '../Components/Home/Popular/Popular'
import Footer from '../Components/Footer/Footer'
import Upcoming from '../Components/Home/Upcoming/Upcoming'

const Home = () => {
  return (
    <>
      <Header />
      <main className='h-full flex flex-col items-center gap-[4.3125rem] bg-[#fff1e6] pt-[3.3125rem]  pb-[5.3125rem] dark:bg-[#111111] transition-bg-color duration-500'>
        <NowShowing />
        <FreshPicks />
        <Popular />
        <Upcoming />
      </main>
      <Footer />
    </>
  )
}

export default Home
