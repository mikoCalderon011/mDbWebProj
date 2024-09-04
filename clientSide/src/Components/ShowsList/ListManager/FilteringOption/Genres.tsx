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


const Genres = ({ selectedGenres, onGenreChange }) => {
  const [localGenres, setLocalGenres] = useState(selectedGenres || []);

  function handleGenreToggle(genreId) {
    const updatedGenres = localGenres.includes(genreId)
      ? localGenres.filter(id => id !== genreId)
      : [...localGenres, genreId];

    setLocalGenres(updatedGenres);
    onGenreChange(updatedGenres);
  }

  return (
    <div className='text-white font-roboto flex flex-col gap-[0.875rem]'>
      <span className='text-[#ff8731] font-bold text-[.75rem]'>GENRES</span>
      <div className='flex flex-wrap gap-[0.6875rem]'>
        {genres.map((genre) => {
          const isSelected = selectedGenres.includes(genre.id);

          return (
            <button
              key={genre.id}
              className={`px-[1rem] py-[0.4375rem] rounded-full text-[.75rem] ${isSelected ? 'bg-[#ff8731]' : 'bg-[#1C252F] hover:bg-[#2d3748]'
                } hover:scale-105 transition-transform`}
              onClick={() => handleGenreToggle(genre.id)}
            >
              {genre.name}
            </button>

          );
        })}
      </div>
    </div>
  )
}

export default Genres
