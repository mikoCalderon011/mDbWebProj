import React from 'react'
import MovieCarousel from '../MovieCarousel'

const Upcoming = () => {
   return (
      <div className='w-[66.625rem] h-auto font-roboto flex flex-col gap-[1.125rem] text-white'>
         <h2 className='text-[1.5rem] font-bold text-black dark:text-[#fff1e6]'>On the Horizon</h2>
         <span className='text-[0.875rem] text-black dark:text-[#fff1e6]'>
            Don't miss out on the films set to premiere soon. Here’s what’s coming your way.
         </span>
         <MovieCarousel section={2} />
      </div>
   )
}

export default Upcoming
