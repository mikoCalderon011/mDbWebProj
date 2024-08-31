import React, { useState } from 'react'
import { TabSwitch } from '../../Button/Buttons'
import MovieCarousel from '../MovieCarousel';

const FreshPicks = () => {
   const [selectedPeriod, setSelectedPeriod] = useState(1);

   const handlePeriodChange = (value) => {
      setSelectedPeriod(value);
   };

   return (
      <div class="fresh-picks--container">
         <div class="header">
            <h2 class="title">Fresh Picks</h2>
            <TabSwitch
               section={0}
               selectedTab={selectedPeriod}
               onTabChange={handlePeriodChange}
               class="tab-switch"
            />
         </div>
         <span class="description">
            Explore the must-watch movies of the day or week, handpicked just for you.
         </span>
         <MovieCarousel
            section={0}
            query={`${selectedPeriod === 1 ? 'day' : 'week'}`}
            class="movie-carousel"
         />
      </div>

   );
}

export default FreshPicks
