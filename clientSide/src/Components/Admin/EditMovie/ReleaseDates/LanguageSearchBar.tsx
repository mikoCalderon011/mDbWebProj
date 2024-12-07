import React, { useState } from 'react'
import LanguageSearch from './LanguageSearch'

const LanguageSearchBar = ({ releaseDate, setReleaseDate }) => {
   const [results, setResults] = useState([]);

   return (
      <div className="language-search-bar">
         <label>Language</label>
         <div>
            <LanguageSearch
               setResults={setResults}
               releaseDate={releaseDate}
               setReleaseDate={setReleaseDate}
            />
         </div>
         {results.length > 0 && (
            <div className="results--container">
               {results.map((language) => (
                  <div
                     key={language.iso_639_1}
                     className="result-item"
                     onClick={() => {
                        setReleaseDate({
                           ...releaseDate,
                           language: language.english_name
                        });
                        setResults([]);
                     }}
                  >
                     <div className="flex justify-between">
                        <span>{language.english_name}</span>
                        <span className="language-code">{language.iso_639_1}</span>
                     </div>
                  </div>
               ))}
            </div>
         )}
      </div>
   )
}

export default LanguageSearchBar
