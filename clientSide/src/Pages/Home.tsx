import React from 'react'
import Header from '../Components/Header/Header'
import NowShowing from '../Components/Home/Now Showing/NowShowing'

const Home = () => {
  return (
    <>
      <Header />
      <main className='flex flex-col items-center'>
        <NowShowing />
      </main>
    </>
  )
}

export default Home
