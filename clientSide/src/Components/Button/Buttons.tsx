import axios from 'axios';
import React, { useEffect, useState } from 'react'

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

   console.log(movieTrailer);

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
