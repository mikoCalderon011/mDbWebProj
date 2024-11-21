import React, { useState } from 'react'
import SearchIcon from '../../../assets/Icons/SearchIcon'
import SearchResultList from './SearchResultList';
import Search from './Search';

const SearchBar = () => {
	const [results, setResults] = useState([]);

	return (
		<div className='search-bar--container' >
			<div className='search-bar--wrapper'>
				<SearchIcon />
				<Search setResults={setResults} />
			</div>
			{results && results.length > 0 && <SearchResultList results={results}/>}
		</div>

	)
}

export default SearchBar
