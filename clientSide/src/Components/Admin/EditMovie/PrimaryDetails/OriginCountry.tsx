import React from 'react'

const OriginCountry = ({ primaryDetails, setPrimaryDetails, countries, filteredCountries, setFilteredCountries, inputValue, setInputValue }) => {
   const handleCountryInputChange = (e) => {
      const value = e.target.value;
      setInputValue(value);

      // Filter countries based on the input value
      const filtered = countries.filter(country =>
         country.english_name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCountries(filtered);
   };

   const handleSelectCountry = (country) => {
      // Only add the country if it's not already in the selected countries list
      if (!primaryDetails.origin_country.includes(country.iso_3166_1)) {
         setPrimaryDetails({
            ...primaryDetails,
            origin_country: [...primaryDetails.origin_country, country.iso_3166_1]
         });
      }

      // Clear input and filtered countries after selection
      setInputValue('');
      setFilteredCountries([]);
   };

   const handleRemoveCountry = (countryToRemove) => {
      setPrimaryDetails({
         ...primaryDetails,
         origin_country: primaryDetails.origin_country.filter(country => country !== countryToRemove)
      });
   };

   return (
      <div className="origin-country--container">
         <label htmlFor="origin_country" className="text-[.875rem] font-bold">
            Origin Country
         </label>
         <div className="input--wrapper">
            <div className="selected-countries">
               {primaryDetails.origin_country.map((country) => (
                  <div
                     key={country}
                     className="country-chip"
                     onClick={() => handleRemoveCountry(country)}
                  >
                     {country}
                     <span className="remove-icon">×</span>
                  </div>
               ))}
               <input
                  id="origin_country"
                  type="text"
                  value={inputValue}
                  placeholder='Search...'
                  onChange={handleCountryInputChange}
               />
            </div>

            {filteredCountries.length > 0 && (
               <div className="dropdown">
                  {filteredCountries.map((country) => (
                     <div
                        key={country.iso_3166_1}
                        className="dropdown--item"
                        onClick={() => handleSelectCountry(country)}
                     >
                        {country.english_name}
                     </div>
                  ))}
               </div>
            )}
         </div>
      </div>
   )
}

export default OriginCountry