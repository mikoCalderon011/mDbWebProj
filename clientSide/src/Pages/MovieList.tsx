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
      moviePlatform: []
    },
    releaseYear: {
      gteYear: '',
      lteYear: ''
    },
    userScore: {
      minScore: 0,
      maxScore: 10
    },
    runtime: {
      gteRuntime: '',
      lteRuntime: ''
    },
    certification: {
      rating: [],
      certCountry: 'PH'
    }
  });

  const handleFilterChange = (filterName, value) => {
    setFilters(prevFilters => {
      if (filterName === 'watchProviders') {
        return {
          ...prevFilters,
          watchProviders: {
            ...prevFilters.watchProviders,
            ...value
          }
        };
      } else if (filterName === 'userScore') {
        return {
          ...prevFilters,
          userScore: {
            ...prevFilters.userScore,
            ...value
          }
        };
      } 
      else if (filterName === 'releaseYear') {
        return {
          ...prevFilters,
          releaseYear: {
            ...prevFilters.releaseYear,
            ...value
          }
        };
      }
      else if (filterName === 'runtime') {
        return {
          ...prevFilters,
          runtime: {
            ...prevFilters.runtime,
            ...value
          }
        };
      }
      else if (filterName === 'certification') {
        return {
          ...prevFilters,
          certification: {
            ...prevFilters.certification,
            ...value
          }
        };
      }
      else {
        return {
          ...prevFilters,
          [filterName]: value
        };
      }
    });
  };

  useEffect(() => {
    const selectedGenres = filters.genres.join(',')
    const selectedWatchProviders = filters.watchProviders.moviePlatform.join('|')
    const selectedCertification = filters.certification.rating.join('|')

    const params = new URLSearchParams({
      include_adult: 'false',
      include_video: 'false',
      language: 'en-US',
      page: '1',
      sort_by: 'popularity.desc',
      with_genres: selectedGenres || '',
      watch_region: filters.watchProviders.watchRegion || '',
      with_watch_providers: selectedWatchProviders || '',
      'vote_average.gte': filters.userScore.minScore || 0,
      'vote_average.lte': filters.userScore.maxScore || 10,
      'release_date.gte': filters.releaseYear.gteYear || '',
      'release_date.lte': filters.releaseYear.lteYear || '',
      'with_runtime.gte': filters.runtime.gteRuntime || '',
      'with_runtime.lte': filters.runtime.lteRuntime || '',
      certification: selectedCertification,
      certification_country: filters.certification.certCountry
    }).toString();

    const fetchMovieList = async () => {
      try {
        const data = await apiFetch(`/discover/movie?${params}`);
        // console.log(`/discover/movie?${params}`);
        setMovies(data)
      }
      catch (error) {
        console.log('Encounted an error while fetching movie data', error)
      }
    }

    fetchMovieList();

  }, [filters])

  // console.log(filters.releaseYear);
  console.log(movies);

  return (
    <>
      <Header />
      <main className='text-white flex flex-col font-roboto'>
        <Marquee display={"movies"} />
        <div className='w-[66.5625rem] flex'>
          <div className='flex'>
            <FilteringOption filters={filters} onFilterChange={handleFilterChange} />
            <SortByOption providers={filters} onProviderChange={handleFilterChange} />
          </div>
          <DisplayViewOption />
        </div>
      </main>
    </>
  )
}

export default MovieList
