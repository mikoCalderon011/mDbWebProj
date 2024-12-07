import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { fetchSearchTVWithCredits } from '../../../api/api'

// CURRENTLY ONLY ABLE TO SCAN THE TMDB TV CONTENTS

const TvContentCheck = ({ movieDetails }) => {
  const query = movieDetails?.original_title;
  const [duplicateContent, setDuplicateContent] = useState();

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['tvSearch', query],
    queryFn: () => fetchSearchTVWithCredits(query),
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
    return <span className="error-message">Error fetching TV content data.</span>;
  }

  console.log(duplicateContent);

  if (duplicateContent) {
    return (
      <div className='movie-content-check'>
        <span className='title'>
          TV Content Duplication Alert
        </span>
        {isSuccess && (
          <span>
            {data.results && data.results.length > 0
              ? 'The title you provided matches an existing TV show. Please verify the content type before proceeding. If this is not a duplicate, you may proceed.'
              : 'No duplicate TV content found. You may proceed :)'}
          </span>
        )}
        <div className='content-wrapper'>
          {duplicateContent.map((tvContent) => {
            return (
              <div
                key={tvContent.id}
                className='content-item scrollbar-none'
              >
                <img
                  className='w-[5rem] h-full'
                  src={`https://image.tmdb.org/t/p/original${tvContent.poster_path}`}
                  alt={tvContent.name}
                />
                <div className='content-details'>
                  <span className='movie-title'>{tvContent.name}</span>
                  <span className='cast'>
                    {tvContent.credits?.cast?.slice(0, 3).map((actor, index) => (
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

export default TvContentCheck
