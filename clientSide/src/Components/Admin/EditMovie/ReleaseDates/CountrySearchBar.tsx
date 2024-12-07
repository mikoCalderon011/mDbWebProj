import React, { useState } from 'react'
import CountrySearch from './CountrySearch';

const CountrySearchBar = ({ releaseDate, setReleaseDate }) => {
   const [results, setResults] = useState([]);

   return (
      <div className="country-search-bar">
         <label className="search-label">Country</label>
         <div>
            <CountrySearch
               setResults={setResults}
               releaseDate={releaseDate}
               setReleaseDate={setReleaseDate}
            />
         </div>
         {results.length > 0 && (
            <div className="results--container">
               {results.map((country) => (
                  <div
                     key={country.iso_3166_1}
                     className="result-item"
                     onClick={() => {
                        setReleaseDate({
                           ...releaseDate,
                           country: { name: country.english_name, iso_3166_1: country.iso_3166_1 } 
                        });
                        setResults([]); // Clear results after selection
                     }}
                  >
                     <span>{country.english_name}</span>
                  </div>
               ))}
            </div>
         )}
      </div>
   )
}

export default CountrySearchBar
