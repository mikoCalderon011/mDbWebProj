import React from 'react'
import SearchResult from './SearchResult';

const SearchResultList = ({ results }) => {
  return (
    <div className='w-full h-auto bg-[#D9D9D9] text-black rounded-sm absolute mt-[0.3rem] flex flex-col justify-center dark:bg-[#1C252F]'>
      {results.map((result, id) => {
        let searchData = {};

        if (result.media_type === "movie") {
          console.log('a')
          searchData = {
            dataOne: result.title,
            dataTwo: [
              result.media_type,
              result.release_date ? result.release_date.substring(0, 4) : null,
            ].filter(Boolean).join(', '),
            dataThree: result.overview,
            dataFour: result.poster_path
          }
        }
        else if (result.media_type === "tv") {
          console.log('b')
          searchData = {
            dataOne: result.name,
            dataTwo: [
              result.media_type,
              result.first_air_date ? result.first_air_date.substring(0, 4) : null,
            ].filter(Boolean).join(', '),
            dataThree: result.overview,
            dataFour: result.poster_path
          }
        }
        else if (result.media_type === "person") {
          console.log('c')
          searchData = {
            dataOne: result.name,
            dataTwo: result.known_for_department,
            dataThree: [
              result.known_for[0]?.title,
              result.known_for[1]?.title,
              result.known_for[2]?.title
            ].filter(Boolean).join(', '),
            dataFour: result.profile_path
          }
        }

        return <SearchResult data={searchData} key={id} />
      })}
      
    </div>
  )
}

export default SearchResultList
