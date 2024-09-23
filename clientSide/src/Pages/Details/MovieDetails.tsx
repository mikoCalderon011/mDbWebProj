import React, { useState } from 'react'
import Header from '../../components/Header/Header'

const MovieDetails = () => {
   const [autoplay, setAutoplay] = useState(false);

  return (
    <>
      <Header />
      <iframe 
         src={`https://www.youtube.com/embed/umxRwIKOPA4?autoplay=${autoplay ? 1 : 0}`} className='w-[37.125rem] h-[20.875rem] rounded-[1rem]' allow="autoplay; encrypted-media" 
         allowfullscreen />
      <button onClick={() => setAutoplay(!autoplay)}>
         click to play
      </button>
    </>
  )
}

export default MovieDetails
