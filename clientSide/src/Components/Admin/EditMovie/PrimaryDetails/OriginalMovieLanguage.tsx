import React from 'react'

const OriginalMovieLanguage = ({ primaryDetails, setPrimaryDetails, languages }) => {

   const handleLanguageChange = (event) => {
      const iso_639_1 = languages.find(lang => lang.english_name === event.target.value)?.iso_639_1;
      setPrimaryDetails({ ...primaryDetails, original_language: iso_639_1 });
   };

   return (
      <div className="original-language--container">
         <label htmlFor="original_language">
            Original Movie Language
         </label>
         <div className="select--wrapper">
            <select
               id="original_language"
               value={
                  languages.find(lang => lang.iso_639_1 === primaryDetails?.original_language)?.english_name || ''
               }
               onChange={handleLanguageChange}
            >
               <option value="" disabled>Select a language</option>
               {languages.map((language) => (
                  <option key={language.code} value={language.code}>
                     {language.english_name}
                  </option>
               ))}
            </select>
         </div>
      </div>
   )
}

export default OriginalMovieLanguage
