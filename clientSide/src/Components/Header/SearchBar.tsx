import React, { useState } from 'react'
import SearchIcon from '../../assets/Icons/SearchIcon'
import axios from 'axios'

const fetchData = async (value) => {
    try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${value}include_adult=false&language=en-US&page=1`, {
            params: {
                query: value,
                include_adult: false,
                language: 'en-US',
                page: 1
            },
            headers: {
                'Authorization': `Bearer ${import.meta.env.VITE_TMDB_API_READ_ACCESS_KEY}`,
                'Content-Type': 'application/json'
            }
        });
        console.log(response.data);
        return response.data; 
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const SearchBar = () => {
    const [search, setSearch] = useState('');

    const handleChange = (search) => {
        setSearch(search);
        fetchData(search);
    }

    return (
        <div className='min-h-[2rem] w-[24.9375rem] bg-[#D9D9D9] mx-[1.75rem] rounded-[2px] flex items-center'>
            <SearchIcon />
            <input 
                className='w-full font-roboto text-[0.875rem] bg-transparent focus:outline-none dark:text-black' type="text" 
                placeholder='Search for movies, tv shows, or actors...' 
                value={search}
                onChange={(e) => handleChange(e.target.value)}
            />
        </div>
    )
}

export default SearchBar
