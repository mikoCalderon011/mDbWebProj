import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CarouselButtons, WatchlistButton } from '../Button/Buttons';
import StarOutline from '../../assets/Icons/StarOutline';
import StarIcon from '../../assets/Icons/StarIcon';

const MovieCarousel = ({ section, query }) => {
   let MOVIE_API = ``;

   if (section === 0) {
      MOVIE_API = `https://api.themoviedb.org/3/trending/movie/${query}?language=en-US`
   }
   else if (section === 1) {
      MOVIE_API = `https://api.themoviedb.org/3/${query}/popular?language=en-US&page=1`
   }
   else if (section === 2) {
      MOVIE_API = 'https://api.themoviedb.org/3/movie/upcoming?language=fil-PH&page=1'
   }

   const [movieTrend, setMovieTrend] = useState([]);
   const [slideCard, setSlideCard] = useState(0);
   const cardsToShow = 6;

   useEffect(() => {
      const fetchMovieTrends = async () => {
         try {
            const response = await axios.get(MOVIE_API, {
               headers: {
                  'Authorization': `Bearer ${import.meta.env.VITE_TMDB_API_READ_ACCESS_KEY}`,
                  'Content-Type': 'application/json'
               }
            })

            const topResults = response.data.results.slice(0, 18)
            setMovieTrend(topResults)
         }
         catch (error) {
            console.log("Error fetching movie trend data", error)
         }
      }

      fetchMovieTrends();
   }, [MOVIE_API])

   const nextSlide = () => {
      setSlideCard(slideCard === movieTrend.length - 1 ? 0 : slideCard + 6);
   };

   const prevSlide = () => {
      setSlideCard(slideCard === 0 ? movieTrend.length - 1 : slideCard - 6);
   };

   return (
      <div className='relative flex gap-[1.375rem] font-roboto'>
         {slideCard !== 0 ? <CarouselButtons direction="left" slideDirection={prevSlide} /> : null}
         {movieTrend.slice(slideCard, slideCard + cardsToShow).map((data, index) => {
            return (
               <div 
                  className='w-[9.9375rem] flex flex-col bg-[#1a1a1a] rounded-md' 
                  key={index}
               >
                  <img
                     src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                     alt={data.title || data.name}
                     className='w-[10.1375rem] h-[14.1875rem] rounded-md object-cover'
                  />
                  <figcaption className='flex flex-col py-[0.9375rem] px-[0.625rem] gap-[0.9375rem]'>
                     <div className='flex justify-around'>
                        <div className='flex gap-[0.39875rem]'>
                           <StarIcon />
                           <span>{data.vote_average.toFixed(1)}</span>
                        </div>
                        <div className='flex gap-[0.39875rem]'>
                           <StarOutline />
                           <span>0</span>
                        </div>
                     </div>
                     <span className='text-[1rem] block truncate'>
                        {slideCard + 1 + index}. {data.title || data.name}
                     </span>
                     <WatchlistButton />
                  </figcaption>
               </div>
            )
         })}
         {slideCard !== movieTrend.length - 6 ? <CarouselButtons direction="right" slideDirection={nextSlide} /> : null}
      </div>
   )
}

export default MovieCarousel
