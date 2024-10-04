import React, { useEffect } from 'react'
import Header from '../../components/Header/Header'
import { useParams } from 'react-router-dom'
import { imagesApi, videosApi } from '../../api/api';

const MovieMedias = () => {
  const params = useParams();

  useEffect(() => {
    const fetchMediaData = async () => {
      try {
        const movieId = params.movieId.split('-')[0];  // Extract the movie ID once
        let response;

        if (['backdrops', 'posters', 'logos'].includes(params.mediaType)) {
          response = await imagesApi('movie', movieId);
        } 
        else if (params.mediaType === 'videos')  {
          response = await videosApi('movie', movieId);
        }

        console.log(response)
      } 
      catch (error) {
        console.error("Error fetching media data:", error);
      }
    };

    fetchMediaData();
  }, [params]);

  return (
    <>
      <Header />
      <main className='text-white flex flex-col gap-0 font-roboto p-0'>
        <div className='w-[66.5rem]'>
          
        </div>
      </main>
    </>
  )
}

export default MovieMedias
