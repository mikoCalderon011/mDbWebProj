import React, { createContext, useEffect, useState } from 'react'
import Header from '../components/Header/Header'
import Marquee from '../components/ShowsList/Marquee'
import FilteringOption from '../components/ShowsList/ListManager/FilteringOption'
import DisplayViewOption from '../components/ShowsList/ListManager/DisplayViewOption'
import { apiFetch } from '../api/api'
import SortByOption from '../components/ShowsList/ListManager/SortByOption'
import CompactView from '../components/ShowsList/ListManager/ViewDisplay/CompactView'
import GridView from '../components/ShowsList/ListManager/ViewDisplay/GridView'
import Footer from '../components/Footer/Footer'
import _ from 'lodash'

export const Context = createContext(undefined);

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  // FilteringOption
  const [filters, setFilters] = useState({
    genres: [],
    watchProviders: {
      name: 'Philippines',
      watchRegion: 'PH',
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
    },
    originalLanguage: {
      iso_639_1: '',
      english_name: ''
    },
    keyword: {
      keywordIds: [],
      keywords: []
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
      else if (filterName === 'originalLanguage') {
        return {
          ...prevFilters,
          originalLanguage: {
            ...prevFilters.originalLanguage,
            ...value
          }
        };
      }
      else if (filterName === 'keyword') {
        return {
          ...prevFilters,
          keyword: {
            ...prevFilters.keyword,
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

  // SortByOption
  const [selectedSortBy, setSelectedSortBy] = useState({
    value: 'popularity.desc',
    label: 'Popularity Descending'
  })

  // DisplayViewOption
  const [selectedView, setSelectedView] = useState(0);

  useEffect(() => {
    const selectedGenres = filters.genres.join(',')
    const selectedWatchProviders = filters.watchProviders.moviePlatform.join('|')
    const selectedCertification = filters.certification.rating.join('|')
    const selectedKeywords = filters.keyword.keywordIds.join('|')
    const selectedLanguage = filters.originalLanguage.iso_639_1 === "xx"
      ? ''
      : filters.originalLanguage.iso_639_1

    const params = new URLSearchParams({
      include_adult: 'false',
      include_video: 'false',
      language: 'en-US',
      page: currentPage,
      sort_by: selectedSortBy.value,
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
      certification_country: filters.certification.certCountry,
      with_original_language: selectedLanguage,
      with_keywords: selectedKeywords
    }).toString();

    const fetchMovieList = async () => {
      try {
        const data = await apiFetch(`/discover/movie?${params}`);
        // console.log(`/discover/movie?${params}`);
        setMovies(prevMovies => {
          if (currentPage === 1) {
            return data.results
          }
          else {
            const existingMovieIds = new Set(prevMovies.map(movie => movie.id));
            const newMovies = data.results.filter(movie => !existingMovieIds.has(movie.id));
            return [...prevMovies, ...newMovies];
          }
        });

      }
      catch (error) {
        console.log('Encounted an error while fetching movie data', error)
      }
    }

    fetchMovieList();

    const handleScroll = _.debounce(() => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const documentHeight = document.body.offsetHeight;

      if (scrollPosition >= documentHeight) {
        setCurrentPage(prevPage => prevPage + 1);  // Increase page number
      }
    }, 500);

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, [filters, selectedSortBy, currentPage])

  console.log(currentPage)

  return (
    <>
      <Header />
      <main className='text-white flex flex-col font-roboto'>
        <Marquee display={"movies"} />
        <div className='w-[66.5625rem] flex justify-between'>
          <Context.Provider value={{ filters, handleFilterChange, setCurrentPage }}>
            <div className='flex items-center gap-[2.5625rem]'>
              <FilteringOption />
              <SortByOption selectedSorting={selectedSortBy} setSelectedSorting={setSelectedSortBy} resetCurrentPage={setCurrentPage} />
            </div>
            <DisplayViewOption setSelectedView={setSelectedView} resetCurrentPage={setCurrentPage} />
          </Context.Provider>
        </div>
        <Context.Provider value={{ filters }}>
          {selectedView === 0
            ? <CompactView movies={movies}  />
            : <GridView movies={movies} />
          }
        </Context.Provider>
      </main>
      {/* <Footer /> */}
    </>
  )
}

export default MovieList
