import React from 'react'
import SearchIcon from '../../assets/Icons/SearchIcon'

const SearchBar = () => {
    return (
        <div className='min-h-[2rem] w-[24.9375rem] bg-[#D9D9D9] mx-[1.75rem] rounded-[2px] flex items-center'>
            <SearchIcon />
            <input className='w-full font-roboto text-[0.875rem] bg-transparent focus:outline-none' type="text" placeholder='Search for movies, tv shows, or actors...' />
        </div>
    )
}

export default SearchBar
