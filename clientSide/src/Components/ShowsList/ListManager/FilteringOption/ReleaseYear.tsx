import React, { useState } from 'react'

const ReleaseYear = ({ selectedReleaseYear, onReleaseYearChange }) => {
  const [releaseYear, setReleaseYear] = useState({
    gteYear: selectedReleaseYear.gteYear,
    lteYear: selectedReleaseYear.lteYear
  })

  const handleReleaseYearChange = (e, type) => {
    const inputValue = e.target.value;
    const parsedValue = parseInt(inputValue, 10);
  
    setReleaseYear(prevState => ({
      ...prevState,
      [type]: convertYearToDate(parsedValue)
    }));
  
    onReleaseYearChange({
      ...releaseYear,
      [type]: convertYearToDate(parsedValue)
    });
  };

  function convertYearToDate(year) {
    if (year && !isNaN(year) && year > 0 && year < 10000) {
      return `${year}-12-31`; 
    }
    return '';
  }

  // console.log(releaseYear)

  return (
    <div className='text-white font-roboto flex flex-col gap-[0.875rem]'>
      <span className='text-[#ff8731] font-bold text-[.75rem]'>RELEASE YEAR</span>
      <div className='flex items-center gap-[.6rem]'>
        <div className="w-[16.875rem] h-[2.5rem] border-2 border-white rounded-md flex items-center px-3 hover:border-[#ff8731] focus-within:border-[#ff8731] transition duration-300 ease-in-out">
          <input
            type="number"
            className="w-full h-full text-[.75rem] bg-transparent text-white placeholder-gray-500 focus:outline-none"
            onBlur={(e) => handleReleaseYearChange(e, 'gteYear')}
          />
        </div>
        <span className='text-[.75rem]'>to</span>
        <div className="w-[16.875rem] h-[2.5rem] border-2 border-white rounded-md flex items-center px-3 hover:border-[#ff8731] focus-within:border-[#ff8731] transition duration-300 ease-in-out">
          <input
            type="number"
            className="w-full h-full text-[.75rem] bg-transparent text-white placeholder-gray-500 focus:outline-none"
            onBlur={(e) => handleReleaseYearChange(e, 'lteYear')}
          />
        </div>
      </div>
    </div>
  )
}

export default ReleaseYear
