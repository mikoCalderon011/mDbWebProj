import React, { useState } from 'react'

const genres = [
  { "id": 28, "name": "Action" },
  { "id": 12, "name": "Adventure" },
  { "id": 16, "name": "Animation" },
  { "id": 35, "name": "Comedy" },
  { "id": 80, "name": "Crime" },
  { "id": 99, "name": "Documentary" },
  { "id": 18, "name": "Drama" },
  { "id": 10751, "name": "Family" },
  { "id": 14, "name": "Fantasy" },
  { "id": 36, "name": "History" },
  { "id": 27, "name": "Horror" },
  { "id": 10402, "name": "Music" },
  { "id": 9648, "name": "Mystery" },
  { "id": 10749, "name": "Romance" },
  { "id": 878, "name": "Science Fiction" },
  { "id": 10770, "name": "TV Movie" },
  { "id": 53, "name": "Thriller" },
  { "id": 10752, "name": "War" },
  { "id": 37, "name": "Western" }
];


const Genres = ({ onGenreChange }) => {
  const [selectedGenres, setSelectedGenres] = useState([]);

  function passSelectedGenres(genreId) {
    let updatedGenres;

    if (selectedGenres.includes(genreId)) {
      updatedGenres = selectedGenres.filter(id => id !== genreId);
    } 
    else {
      updatedGenres = [...selectedGenres, genreId];
    }
    setSelectedGenres(updatedGenres);
    onGenreChange(updatedGenres);
  }

  return (
    <div className='py-[2rem] px-[2.8125rem] text-white font-roboto flex flex-col gap-[0.875rem]'>
      <span className='text-[#ff8731] font-bold text-[.75rem]'>GENRES</span>
      <div className='flex flex-wrap gap-[0.6875rem]'>
        {genres.map((data) => {
          const isSelected = selectedGenres.includes(data.id);
          
          return (
            <button
              key={data.id}
              className={`px-[1rem] py-[0.4375rem] rounded-full text-[.75rem] ${
                isSelected ? 'bg-[#ff8731]' : 'bg-[#1C252F]'
              }`}
              onClick={() => passSelectedGenres(data.id)}
            >
              {data.name}
            </button>
          );
        })}
      </div>
    </div>
  )
}

export default Genres
