import React, { useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import Marquee from '../components/ShowsList/Marquee'
import FilteringOption from '../components/ShowsList/ListManager/FilteringOption'
import SortByOption from '../components/ShowsList/ListManager/SortByOption'
import DisplayViewOption from '../components/ShowsList/ListManager/DisplayViewOption'
import { apiFetch } from '../api/api'

const MovieList = () => {
  const [movies, setMovies] = useState([]);

  const [filters, setFilters] = useState({
    genres: [],
    watchProviders: {
      watchRegion: '',
      moviePlatform: ''
    }
  });

  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [filterName]: value
    }));
  };

  useEffect(() => {
    const selectedGenres = filters.genres.join(',')

    const fetchMovieList = async () => {
      try {
        const data = await apiFetch(`/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${selectedGenres}`)

        setMovies(data)
      }
      catch (error) {
        console.log('Encounted an error while fetching movie data', error)
      }
    }
    
    fetchMovieList();

  }, [filters.genres])

  // console.log(movies)

  return (
    <>
      <Header />
      <main className='text-white flex flex-col font-roboto'>
        <Marquee display={"movies"} />
        <div className='w-[66.5625rem] flex'>
          <div className='flex'>
            <FilteringOption filters={filters} onFilterChange={handleFilterChange} />
            <SortByOption />
          </div>
          <DisplayViewOption />
        </div>
      </main>
    </>
  )
}

export default MovieList
