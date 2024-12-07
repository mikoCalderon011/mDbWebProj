import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { fetchSearchMovieWithCredits } from '../../../api/api';

// CURRENTLY ONLY ABLE TO SCAN THE TMDB MOVIE CONTENTS

const MovieContentCheck = ({ movieDetails }) => {
  const query = movieDetails?.original_title;
  const [duplicateContent, setDuplicateContent] = useState();

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['movieSearch', query],
    queryFn: () => fetchSearchMovieWithCredits(query),
    enabled: !!query,
  });

  useEffect(() => {
    if (isSuccess) {
      setDuplicateContent(data.results);
    }
  }, [isSuccess, data]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span className="text-red-500">Error fetching movie content data.</span>;
  }

  if (duplicateContent) {
    return (
      <div className='movie-content-check'>
        <span className='title'>
          Movie Content Duplication Alert
        </span>
        {isSuccess && (
          <span className="error-message">
            {data.results && data.results.length > 0
              ? 'The title you provided matches an existing movie. Please verify the content type before proceeding. If this is not a duplicate, you may proceed.'
              : 'No duplicate movie content found. You may proceed :)'}
          </span>
        )}
        <div className='content-wrapper'>
          {duplicateContent.map((movieContent) => {
            return (
              <div
                key={movieContent.id}
                className='content-item scrollbar-none'
              >
                <img
                  src={movieContent.poster_path
                    ? `https://image.tmdb.org/t/p/original${movieContent.poster_path}`
                    : 'https://placehold.co/80x120'}
                  alt={movieContent.title}
                />
                <div className='content-details'>
                  <span className='movie-title'>{movieContent.title}</span>
                  <span className='cast'>
                    {movieContent.credits?.cast?.slice(0, 3).map((actor, index) => (
                      <>
                        {actor.name}
                        {index < 2 && ', '}
                      </>
                    ))}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )
  }
}

export default MovieContentCheck
