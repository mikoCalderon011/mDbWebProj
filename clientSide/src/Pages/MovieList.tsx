import React from 'react'
import Header from '../components/Header/Header'
import Marquee from '../components/ShowsList/Marquee'
import FilteringOption from '../components/ShowsList/ListManager/FilteringOption'
import SortByOption from '../components/ShowsList/ListManager/SortByOption'
import DisplayViewOption from '../components/ShowsList/ListManager/DisplayViewOption'

const MovieList = () => {
  return (
    <>
      <Header />
      <main className='text-white flex flex-col font-roboto'>
        <Marquee display={"movies"} />
        <div className='w-[66.5625rem] flex'>
          <div className='flex'>
            <FilteringOption />
            <SortByOption />
          </div>
          <DisplayViewOption />
        </div>
      </main>
    </>
  )
}

export default MovieList
