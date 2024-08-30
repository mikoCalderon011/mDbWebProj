import React, { useState } from 'react'
import SearchIcon from '../../assets/Icons/SearchIcon'
import SearchResultList from './SearchResultList';
import Search from './Search';

const SearchBar = () => {
	const [results, setResults] = useState([]);

	// console.log(results)

	return (
		<div className='relative' >
			<div className='min-h-[2rem] w-[24.9375rem] bg-[#D9D9D9] rounded-[2px] flex items-center dark:bg-[#1C252F]'>
				<SearchIcon />
				<Search setResults={setResults} />
			</div>
			{results && results.length > 0 && <SearchResultList results={results}/>}
		</div>

	)
}

export default SearchBar
