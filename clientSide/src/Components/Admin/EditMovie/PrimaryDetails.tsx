import React, { useEffect, useState } from 'react';
import { countryListApi, originalLanguageList } from '../../../api/api';
import OriginalMovieLanguage from './PrimaryDetails/OriginalMovieLanguage';
import OriginCountry from './PrimaryDetails/OriginCountry';
import OriginalTitle from './PrimaryDetails/OriginalTitle';
import TranslatedTitle from './PrimaryDetails/TranslatedTitle';

const PrimaryDetails = () => {
  const [languages, setLanguages] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedCountries, setSelectedCountries] = useState([]);

  useEffect(() => {
    const fetchCountryList = async () => {
      try {
        const response = await originalLanguageList();
        const responseTwo = await countryListApi();

        setLanguages(response || []);
        setCountries(responseTwo.results || []);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchCountryList();
  }, []);

  console.log(filteredCountries)

  return (
    <>
      <div className='flex flex-col gap-[1.25rem]'>
        <div className="w-[51.6875rem] flex gap-[0.75rem]">
          <OriginalMovieLanguage
            languages={languages}
            selectedLanguage={selectedLanguage}
            setSelectedLanguage={setSelectedLanguage}
          />
          <OriginCountry
            countries={countries}
            filteredCountries={filteredCountries}
            setFilteredCountries={setFilteredCountries}
            selectedCountries={selectedCountries}
            setSelectedCountries={setSelectedCountries}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        </div>
        <div className='w-[51.6875rem] flex gap-[0.75rem]'>
            <OriginalTitle />
            <TranslatedTitle />
        </div>
      </div>
    </>
  );
};

export default PrimaryDetails;
