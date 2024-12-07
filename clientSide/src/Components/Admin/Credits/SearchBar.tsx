import React, { useState } from 'react'
import Search from './Search';
import SearchResultList from './SearchResultList';

const SearchBar = ({ selectedPerson, setSelectedPerson, type }) => {
   const [results, setResults] = useState([]);

   const handleSelectPerson = (person) => {
      setSelectedPerson(person);
      setResults([]); 
   };

   console.log(selectedPerson)

   return (
      <div className='person--search-bar'>
         <label>{type === 'cast' ? "Cast" : "Crew"} Name</label>
         <div>
            <Search 
               setResults={setResults} 
               selectedPerson={selectedPerson}
               type={type}
            />
         </div>
         {results && results.length > 0 && <SearchResultList results={results} onSelectPerson={handleSelectPerson}  />}
      </div>
   )
}

export default SearchBar
