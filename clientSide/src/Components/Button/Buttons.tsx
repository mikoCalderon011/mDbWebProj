import axios from 'axios';
import React, { useEffect, useState } from 'react'
import LeftIcon from '../../assets/Icons/LeftIcon';
import RightIcon from '../../assets/Icons/RightIcon';
import PlusIcon from '../../assets/Icons/PlusIcon';

export function WatchTrailerButton({ movieId }) {
   const SPECIFIC_MOVIE_DATA_API = `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=videos&language=en-US`
   const [movieTrailer, setMovieTrailer] = useState('');

   useEffect(() => {
      const fetchMovies = async () => {
         try {
            const response = await axios.get(SPECIFIC_MOVIE_DATA_API, {
               params: {
                  language: 'en-US',
               },
               headers: {
                  'Authorization': `Bearer ${import.meta.env.VITE_TMDB_API_READ_ACCESS_KEY}`,
                  'Content-Type': 'application/json'
               }
            })

            const officialTrailerVideos = response.data.videos.results.filter(
               video => video.name === 'Official Trailer'
            );
            setMovieTrailer(officialTrailerVideos[0].key);
         }
         catch (error) {
            console.log('Error fetching movie data', error)
         }
      }

      fetchMovies();
   }, [movieId, SPECIFIC_MOVIE_DATA_API])

   return (
      <>
         <a
            className='w-[9.5rem] h-[2.5rem] border-[1px] border-white rounded-full flex justify-center items-center 
              text-white hover:text-gray-200 active:text-gray-400
              hover:border-gray-200 active:border-gray-400'
            href={`https://www.youtube.com/watch?v=${movieTrailer}`}
            target="_blank"
            rel="noopener noreferrer"
         >
            <span className='text-[0.875rem]'>
               Watch the trailer
            </span>
         </a>

      </>
   );
}

export function FreshPickSelector({ selectedPeriod, onPeriodChange }) {
   const changePeriod = (value) => {
      if (selectedPeriod !== value) {
         onPeriodChange(value);
      }
   };

   return (
      <div className='h-[1.75rem] w-auto border-[1px] rounded-md flex text-[0.875rem] font-bold items-center text-white'>
         <div
            className={`h-full px-[1.25rem] flex items-center rounded-sm cursor-pointer ${selectedPeriod === 1 ? "bg-[#FFF1E6] text-black" : "bg-transparent"}`}
            onClick={() => changePeriod(1)}
         >
            <span>Today</span>
         </div>
         <div
            className={`h-full px-[1.25rem] flex items-center rounded-sm cursor-pointer ${selectedPeriod === 2 ? "bg-[#FFF1E6] text-black" : "bg-transparent"}`}
            onClick={() => changePeriod(2)}
         >
            <span>Week</span>
         </div>
      </div>
   );
}

export function CarouselButtons({ direction, slideDirection }) {
   return (
      <button 
         className={`w-[3rem] h-[3rem] bg-[#1C252F] rounded-full opacity-70 absolute top-[30%] ${direction === 'left' ? 'left-[-1.5rem]' : 'right-[-1.5rem]'}`}
         onClick={slideDirection}   
      >
         {direction === "left" ? <LeftIcon /> : <RightIcon />}
      </button>
   )
}

export function WatchlistButton() {
   return (
      <button className='flex justify-center items-center gap-[0.5rem] bg-[#1C252F] h-[2.25rem] rounded-md'>
         <PlusIcon />
         <span className='text-[#3D81E7] text-[0.875rem]'>Watchlist</span>
      </button>
   )
}