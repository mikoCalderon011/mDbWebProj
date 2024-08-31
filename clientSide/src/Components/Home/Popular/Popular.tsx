import React, { useState } from 'react'
import { TabSwitch } from '../../Button/Buttons'
import MovieCarousel from '../MovieCarousel';

const Popular = () => {
   const [selectedView, setSelectedView] = useState(1);

   const handleCategoryChange = (value) => {
      setSelectedView(value);
   };

   return (
      <div className='w-[66.625rem] h-auto font-roboto flex flex-col gap-[1.125rem] text-white'>
         <div className='flex gap-[1.1rem] items-center'>
            <h2 className='text-[1.5rem] font-bold'>What's Popular</h2>
            <TabSwitch
               section={1}
               selectedTab={selectedView}
               onTabChange={handleCategoryChange}
            />
         </div>
         <span className='text-[0.875rem]'>
            Discover the latest hits everyone's talking about! Stay updated with the most-watched and trending movies and see what's hot on TV right now.
         </span>
         <MovieCarousel section={1} query={`${selectedView === 1 ? 'movie' : 'tv'}`} />
      </div>
   )
}

export default Popular
