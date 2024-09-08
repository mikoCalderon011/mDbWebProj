import React, { useState } from 'react'
import MiguImg from '../../../../assets/Image/migu.jpg'
import PlusIcon from '../../../../assets/Icons/PlusIcon'
import InfoIcon from '../../../../assets/Icons/InfoIcon'
import StarIcon from '../../../../assets/Icons/StarIcon'
import StarOutline from '../../../../assets/Icons/StarOutline'
import DetailModal from './DetailModal'

const GridView = ({ movies, people }) => {
   const [activeDetailModal, setActiveDetailModal] = useState(null);

   // Todo-in-order: tv-shows, people

   console.log(people);

   if (movies) {
      return (
         <div className='flex w-[66.5625rem] gap-[1.375rem] flex-wrap'>
            {movies.map(movie => {
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
                           <span>{movie.vote_average?.toFixed(1)}</span>
                        </div>
                        <div className='flex items-center gap-[4px]'>
                           <StarOutline />
                           <span>0</span>
                        </div>
                     </div>
                     <span className='block w-[8.8125rem] overflow-hidden truncate text-center'>{movie.title}</span>
                     <button
                        className='w-[8.8125rem] h-[2.25rem] flex items-center justify-center gap-[0.81625rem] bg-[#1C252F] rounded-md hover:bg-[#2b3947] transition-colors duration-200'
                     >
                        <PlusIcon />
                        <span className='text-[#3D81E7] hover:text-[#559ef5] transition-colors duration-200'>Watchlist</span>
                     </button>

                     <button
                        className='w-[8.8125rem] h-[2.25rem] flex items-center justify-center gap-[0.81625rem] bg-[#1C252F] rounded-md hover:bg-[#2b3947] transition-colors duration-200'
                        onClick={() => setActiveDetailModal(movie.id)}
                     >
                        <InfoIcon />
                        <span className='hover:text-[#559ef5] transition-colors duration-200'>Details</span>
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
   else if (people) {
      return (
         <div className='flex w-[66.5625rem] gap-[1.375rem] flex-wrap'>
            {people.map((person) => {
               return (
                  <div
                     key={person.id}
                     className='w-[9.9375rem] h-[22.5rem] bg-[#1A1A1A] flex flex-col items-center gap-[0.9375rem] rounded-[0.625rem]'
                  >
                     <img
                        src={person.profile_path !== null ? `https://image.tmdb.org/t/p/w500` + person.profile_path : MiguImg}
                        alt={person.original_name}
                        className='h-[14.0625rem] w-full rounded-[0.625rem] object-cover'
                     />
                     <article className='w-full px-[0.625rem] flex flex-col'>
                        <span className='font-medium'>{person.name}</span>
                        <span className='font-light text-[0.875rem]'>
                           {person.known_for_department}
                        </span>
                        <span className='text-[0.875rem] truncate-lines'>
                           Known for: {person.known_for?.map((movie, index) => (
                              <span key={index}>{movie.title || movie.original_name}{index < person.known_for.length - 1 ? ', ' : ''}</span>
                           ))}
                        </span>
                     </article>
                  </div>
               )
            })}
         </div>
      )
   }
}

export default GridView
