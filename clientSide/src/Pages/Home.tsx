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
      <main className='page-container'>
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
