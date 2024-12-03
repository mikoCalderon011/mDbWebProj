import React, { useState } from 'react'
import Search from './Search';
import SearchResultList from './SearchResultList';

const SearchBar = ({ selectedPerson, setSelectedPerson }) => {
   const [results, setResults] = useState([]);

   const handleSelectPerson = (person) => {
      setSelectedPerson(person);
      setResults([]); 
   };

   console.log(selectedPerson)

   return (
      <div>
         <label className="block text-sm font-medium mb-2">Cast Name</label>
         <div>
            <Search 
               setResults={setResults} 
               selectedPerson={selectedPerson}
            />
         </div>
         {results && results.length > 0 && <SearchResultList results={results} onSelectPerson={handleSelectPerson}  />}
      </div>
   )
}

export default SearchBar
