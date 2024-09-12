import React, { createContext } from 'react'
import Header from '../components/Header/Header'
import Marquee from '../components/ShowsList/Marquee'
import FilteringOption from '../components/ShowsList/ListManager/FilteringOption'
import DisplayViewOption from '../components/ShowsList/ListManager/DisplayViewOption'
import SortByOption from '../components/ShowsList/ListManager/SortByOption'
import CompactView from '../components/ShowsList/ListManager/ViewDisplay/CompactView'
import GridView from '../components/ShowsList/ListManager/ViewDisplay/GridView'
import Footer from '../components/Footer/Footer'
import { useShowsList } from '../hooks/useShowsList'

export const ContextMovies = createContext(undefined);

const MovieList = () => {
  const { items: movies, filters, handleFilterChange, selectedSortBy, setSelectedSortBy, setCurrentPage, selectedView , setSelectedView } = useShowsList('movie');

  // console.log(movies)

  return (
    <>
      <Header />
      <main className='text-white flex flex-col font-roboto'>
        <Marquee display={"movies"} />
        <div className='w-[66.5625rem] flex justify-between'>
          <ContextMovies.Provider value={{ movieStream: 'Movies', filters, handleFilterChange, setCurrentPage }}>
            <div className='flex items-center gap-[2.5625rem]'>
              <FilteringOption />
              <SortByOption selectedSorting={selectedSortBy} setSelectedSorting={setSelectedSortBy} resetCurrentPage={setCurrentPage} />
            </div>
            <DisplayViewOption setSelectedView={setSelectedView} resetCurrentPage={setCurrentPage} />
            {/* {selectedView === 0
              ? <CompactView movies={movies} />
              : <GridView movies={movies} />
            } */}
          </ContextMovies.Provider>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default MovieList
