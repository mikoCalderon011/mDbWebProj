import React, { useEffect, useState } from 'react'
import { countryListApi, watchProviderApi } from '../../../../api/api';
import ArrowIcon from '../../../../assets/Icons/ArrowIcon';

const WatchProvider = () => {
   const [countries, setCountries] = useState([]);
   const [selectedCountry, setSelectedCountry] = useState({
      name: 'Philippines',
      iso_3166_1: "PH"
   });
   const [watchProvider, setWatchProvider] = useState([])
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

   useEffect(() => {
      const fetchWatchProvider = async () => {
         try {
            const countryListResults = await countryListApi();
            setCountries(countryListResults.results);

            const watchProviderResults = await watchProviderApi(selectedCountry.iso_3166_1);
            setWatchProvider(watchProviderResults.results);
         }
         catch (error) {
            console.log('Error during fetching of data', error);
         }
      }

      fetchWatchProvider();
   }, [selectedCountry.iso_3166_1])

   function handleCountrySelect(country) {
      setSelectedCountry({
         name: country.english_name,
         iso_3166_1: country.iso_3166_1
      });
      setIsDropdownOpen(false);
   }

   console.log(watchProvider)

   return (
      <div className='text-white font-roboto flex flex-col gap-[0.875rem]'>
         <div className='flex items-center gap-[1.6875rem]'>
            <span className='text-[#ff8731] font-bold text-[.75rem]'>WATCH PROVIDERS</span>
            <div className='relative'>
               <div
                  className='w-[12.125rem] h-[2rem] bg-[#1C252F] flex items-center justify-between px-[1rem] rounded-[5px] cursor-pointer select-none'
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
               >
                  <span className='text-[.75rem]'>{selectedCountry.name}</span>
                  <ArrowIcon />
               </div>
               {isDropdownOpen && (
                  <div className='w-[12.125rem] max-h-[12rem] bg-[#1C252F] rounded-[5px] mt-[0.5rem] absolute overflow-auto'>
                     {countries.map((country) => {
                        return (
                           <div
                              key={country.iso_3166_1}
                              className='px-[1rem] py-[0.5rem] text-[.75rem] cursor-pointer hover:bg-[#ff8731] rounded-[5px] select-none'
                              onClick={() => handleCountrySelect(country)}
                           >
                              {country.english_name}
                           </div>
                        )
                     })}
                  </div>
               )}
            </div>
         </div>
         <ul className='flex gap-[0.9375rem] flex-wrap'>
            {watchProvider.map((data) => {
               return (
                  <li key={data.provider_id} className='w-[3.125rem] h-[3.125rem] '>
                     <img
                        src={`https://image.tmdb.org/t/p/original${data.logo_path}`}
                        alt=""
                        className='rounded-[0.625rem]'
                     />
                  </li>
               )
            })}
         </ul>
      </div>
   )
}

export default WatchProvider
