import axios from 'axios'
import React, { useEffect, useState } from 'react'

const MovieCarousel = ({ period }) => {
   const MOVIE_TREND_API = `https://api.themoviedb.org/3/trending/movie/${period}?language=en-US`
   const [movieTrend, setMovieTrend] = useState([])

   useEffect(() => {
      const fetchMovieTrends = async() => {
         try {
            const response = await axios.get(MOVIE_TREND_API, {
               headers: {
                  'Authorization': `Bearer ${import.meta.env.VITE_TMDB_API_READ_ACCESS_KEY}`,
                  'Content-Type': 'application/json'
                }
            })

            setMovieTrend(response.data.results)
         }
         catch (error) {
            console.log("Error fetching movie trend data", error)
         }
      }

      fetchMovieTrends();
   }, [MOVIE_TREND_API])

   return (
      <div className='w-[9.9375rem] h-[24.1875rem]'>
         
      </div>
   )
}

export default MovieCarousel
