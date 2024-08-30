import React, { useState } from 'react'
import { FreshPickSelector } from '../../Button/Buttons'
import MovieCarousel from '../MovieCarousel';

const FreshPicks = () => {
   const [selectedPeriod, setSelectedPeriod] = useState(1);

   const handlePeriodChange = (value) => {
      setSelectedPeriod(value);
   };

   return (
      <div className='w-[66.625rem] h-auto font-roboto flex flex-col gap-[1.125rem]'>
         <div className='flex gap-[1.1rem] items-center'>
            <h2 className='text-[1.5rem] font-bold text-white'>Fresh Picks</h2>
            <FreshPickSelector
               selectedPeriod={selectedPeriod}
               onPeriodChange={handlePeriodChange}
            />
         </div>
         <span className='text-[0.875rem] text-white'>
            Explore the must-watch movies of the day or week, handpicked just for you.
         </span>
         <div className='w-[66.5625rem]'>
            <MovieCarousel period={`${selectedPeriod === 1 ? 'day' : 'week'}`} />
         </div>
      </div>
   );
}

export default FreshPicks
