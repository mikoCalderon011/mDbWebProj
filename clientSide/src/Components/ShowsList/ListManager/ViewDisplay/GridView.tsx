import React, { useState } from 'react'
import MiguImg from '../../../../assets/Image/migu.jpg'
import PlusIcon from '../../../../assets/Icons/PlusIcon'
import InfoIcon from '../../../../assets/Icons/InfoIcon'
import StarIcon from '../../../../assets/Icons/StarIcon'
import StarOutline from '../../../../assets/Icons/StarOutline'
import DetailModal from './DetailModal'

const GridView = ({ movies }) => {
   const [activeDetailModal, setActiveDetailModal] = useState(null);

   // Todo-in-order: details modal , compact view, pumping more moviedata while scrolling down, tv-shows, people

   // console.log(movies)

   return (
      <div className='flex w-[66.5625rem] gap-[1.375rem] flex-wrap'>
         {movies.results.map(movie => {
            return (
               <div
                  key={movie.id}
                  className='w-[9.9375rem] h-[25.75rem] bg-[#1A1A1A] flex flex-col items-center gap-[0.9375rem] rounded-[0.625rem]'
               >
                  <img
                     src={movie.poster_path !== null ? `https://image.tmdb.org/t/p/w500` + movie.poster_path : MiguImg}
                     alt={movie.original_title}
                     className='h-[14.0625rem] w-full rounded-[0.625rem] object-cover'
                  />
                  <div className='flex w-full justify-around'>
                     <div className='flex items-center gap-[4px]'>
                        <StarIcon />
                        <span>{movie.vote_average.toFixed(1)}</span>
                     </div>
                     <div className='flex items-center gap-[4px]'>
                        <StarOutline />
                        <span>0</span>
                     </div>
                  </div>
                  <span className='block w-[8.8125rem] overflow-hidden truncate text-center'>{movie.title}</span>
                  <button
                     className='w-[8.8125rem] h-[2.25rem] flex items-center justify-center gap-[0.81625rem] bg-[#1C252F] rounded-md'
                  >
                     <PlusIcon />
                     <span className='text-[#3D81E7]'>Watchlist</span>
                  </button>
                  <button
                     className='w-[8.8125rem] h-[2.25rem] flex items-center justify-center gap-[0.81625rem] bg-[#1C252F] rounded-md'
                     onClick={() => setActiveDetailModal(movie.id)}
                  >
                     <InfoIcon />
                     Details
                  </button>
               </div>
            )
         })}
         {activeDetailModal !== null
            ? <DetailModal movieId={activeDetailModal} exitModal={setActiveDetailModal} />
            : null
         }
      </div>
   )
}

export default GridView
