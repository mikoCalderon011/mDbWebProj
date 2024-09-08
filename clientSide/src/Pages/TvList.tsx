import React from 'react'
import Header from '../components/Header/Header'
import Marquee from '../components/ShowsList/Marquee'

const TvList = () => {
   return (
      <>
         <Header />
         <main className='text-white flex flex-col font-roboto'>
            <Marquee display={"tv shows"} />
         </main>
      </>
   )
}

export default TvList
