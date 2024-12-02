import React, { useEffect, useState } from 'react';
import { countryListApi, originalLanguageList } from '../../../api/api';
import OriginalMovieLanguage from './PrimaryDetails/OriginalMovieLanguage';
import OriginCountry from './PrimaryDetails/OriginCountry';
import OriginalTitle from './PrimaryDetails/OriginalTitle';
import TranslatedTitle from './PrimaryDetails/TranslatedTitle';
import TranslatedOverview from './PrimaryDetails/TranslatedOverview';
import MovieStatus from './PrimaryDetails/MovieStatus';
import AdultMovie from './PrimaryDetails/AdultMovie';
import Video from './PrimaryDetails/Video';
import Runtime from './PrimaryDetails/Runtime';
import Revenue from './PrimaryDetails/Revenue';
import Budget from './PrimaryDetails/Budget';
import Homepage from './PrimaryDetails/Homepage';
import SpokenLanguage from './PrimaryDetails/SpokenLanguage';

const PrimaryDetails = () => {
  const [languages, setLanguages] = useState([]);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [PrimaryDetails, setPrimaryDetails] = useState({
    original_language: '',
    origin_country: [],
    original_title: '',
    title: '',
    overview: '',
    status: '',
    adult: false,
    video: false
  })


  useEffect(() => {
    const fetchCountryList = async () => {
      try {
        const languagesResponse = await originalLanguageList();
        const countriesResponse = await countryListApi();

        setLanguages(languagesResponse || []);
        setCountries(countriesResponse.results || []);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchCountryList();
  }, []);

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
          <OriginalTitle

          />
          <TranslatedTitle />
        </div>
        <TranslatedOverview />
        <div className='w-[51.6875rem] flex gap-[0.75rem]'>
          <MovieStatus />
          <AdultMovie />
        </div>
        <div className='w-[51.6875rem] flex gap-[0.75rem]'>
          <Video />
          <Runtime />
        </div>
        <div className='w-[51.6875rem] flex gap-[0.75rem]'>
          <Revenue />
          <Budget />
        </div>
        <Homepage />
        <SpokenLanguage />
      </div>
    </>
  );
};

export default PrimaryDetails;
