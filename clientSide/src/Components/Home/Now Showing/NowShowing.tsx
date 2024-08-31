import React, { useEffect, useState } from 'react'
import HighlightedShow from './HighlightedShow'
import UpNextShow from './UpNextShow'
import axios from 'axios'

const NOW_SHOWING_MOVIES_API = 'https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1'

const NowShowing = () => {
  const [showingMovies, setShowingMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async() => {
      try {
        const response = await axios.get(NOW_SHOWING_MOVIES_API, {
          params: {
            language: 'en-US',
            page: 1
          },
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_TMDB_API_READ_ACCESS_KEY}`,
				    'Content-Type': 'application/json'
          }
        })

        const topResults = response.data.results.slice(0, 10)
        setShowingMovies(topResults);
      }
      catch (error) {
        console.log('Error fetching movie data', error)
      }
    }

    fetchMovies();
  }, [])

  return (
    <div className='w-[66.625rem] h-auto flex flex-col gap-[0.9375rem] '>
      <h1 className='font-roboto font-extrabold text-[2.25rem] text-[#FF8731]'>NOW SHOWING</h1>
      <p className='font-roboto font-medium text-[1rem] dark:text-[#9b9b9b]'>Catch the latest blockbusters and must-see films currently lighting up the big screen in theaters near you.</p>
      <div className='flex gap-[1.75rem]'>
        <HighlightedShow movieData={showingMovies} />
        <UpNextShow movieData={showingMovies} />
      </div>
    </div>
  )
}

export default NowShowing
