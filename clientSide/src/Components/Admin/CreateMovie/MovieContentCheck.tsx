import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { fetchSearchMovieWithCredits } from '../../../api/api';

// CURRENTLY ONLY ABLE TO SCAN THE TMDB MOVIE CONTENTS

const MovieContentCheck = ({ movieDetails }) => {
  const query = movieDetails?.original_name

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['movieSearch', query],
    queryFn: () => fetchSearchMovieWithCredits(query),
    enabled: !!query,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span className="text-red-500">Error fetching movie content data.</span>;
  }

  return (
    <div className='w-full flex flex-col gap-[1.125rem]'>
      <span className='text-[1.25rem] font-bold'>
        TV Content Duplication Alert
      </span>
      {isSuccess && (
        <span>
          {data.results && data.results.length > 0
            ? 'The title you provided matches an existing movie. Please verify the content type before proceeding. If this is not a duplicate, you may proceed.'
            : 'No duplicate movie content found. You may proceed :)'}
        </span>
      )}
    </div>
  )
}

export default MovieContentCheck
