import React from 'react'

const OriginCountry = ({ countries, filteredCountries, setFilteredCountries, selectedCountries, setSelectedCountries, inputValue, setInputValue }) => {
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
      if (!selectedCountries.includes(country.english_name)) {
        setSelectedCountries([...selectedCountries, country.english_name]);
      }
  
      // Clear input and filtered countries after selection
      setInputValue('');
      setFilteredCountries([]);
    };
  
    const handleRemoveCountry = (countryToRemove) => {
      setSelectedCountries(selectedCountries.filter(country => country !== countryToRemove));
    };

   return (
      <div className="w-[28.9375rem] flex flex-col gap-[0.5625rem] font-roboto">
         <label htmlFor="origin_country" className="text-[.875rem] font-bold">
            Origin Country
         </label>
         <div className="w-full h-full flex bg-transparent border-solid border-[1px] border-white rounded-sm relative">
            {/* Display selected countries inside the same div */}
            <div className="flex items-center gap-2 flex-wrap">
               {selectedCountries.map((country) => (
                  <div
                     key={country}
                     className=" bg-[#CC511D] text-white text-[.75rem] py-1 px-2 rounded-[.25rem] cursor-pointer text-wrap"
                     onClick={() => handleRemoveCountry(country)}
                  >
                     {country}
                     <span className="ml-1">X</span>
                  </div>
               ))}
               <input
                  id="origin_country"
                  type="text"
                  value={inputValue}
                  placeholder='Search...'
                  onChange={handleCountryInputChange}
                  className=" bg-transparent text-white border-none outline-none px-2 text-[.875rem]"
               />
            </div>

            {filteredCountries.length > 0 && (
               <div className="absolute top-[100%] left-0 w-full min-h-[200px] overflow-y-auto bg-black text-white border-[1px] border-[#CC511D] rounded-sm">
                  {filteredCountries.map((country) => (
                     <div
                        key={country.iso_3166_1}
                        className="px-2 py-1 cursor-pointer hover:bg-[#CC511D] hover:text-white"
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
