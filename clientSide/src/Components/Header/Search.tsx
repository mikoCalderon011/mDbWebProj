import React, { useState } from 'react'
import axios from 'axios';

const fetchResults = async (value, setResults) => {
	try {
		const response = await axios.get(`https://api.themoviedb.org/3/search/multi?query=${value}&include_adult=false&language=en-US&page=1`, {
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

		const topResults = response.data.results.slice(0, 6);
		setResults(topResults);
	} catch (error) {
		console.error('Error fetching data:', error);
	}
};

const Search = ({ setResults }) => {
	const [search, setSearch] = useState('');

	const handleChange = (search) => {
		setSearch(search);
		fetchResults(search, setResults);
	}

	return (
		<input
			className='search' type="text"
			placeholder='Search for movies, tv shows, or actors...'
			value={search}
			onChange={(e) => handleChange(e.target.value)}
		/>
	)
}

export default Search
