import React from 'react'
import Header from '../components/Header/Header'
import Marquee from '../components/ShowsList/Marquee'

const MovieList = () => {
  return (
    <>
      <Header />
      <main className='text-white'>
        <Marquee display={"movies"} />
      </main>
    </>
  )
}

export default MovieList
