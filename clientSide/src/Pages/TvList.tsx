import React, { createContext, useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import Marquee from '../components/ShowsList/Marquee'
import DisplayViewOption from '../components/ShowsList/ListManager/DisplayViewOption'
import FilteringOption from '../components/ShowsList/ListManager/FilteringOption'

export const ContextTvShows = createContext(undefined);

const TvList = () => {


   return (
      <>
         <Header />
         <main className='text-white flex flex-col font-roboto'>
            <Marquee display={"tv shows"} />
            {/* <div className='w-[66.5625rem] flex justify-between'>
               <ContextTvShows.Provider value={{ tvStream: 'Tv-shows' }}>
                  <div className='flex items-center gap-[2.5625rem]'>
                     <FilteringOption />
                  </div>
               </ContextTvShows.Provider>
               <DisplayViewOption setSelectedView={setSelectedView} resetCurrentPage={setCurrentPage} />
            </div> */}
            {selectedView === 0 ? "compact" : "grid"}
         </main>
      </>
   )
}

export default TvList
