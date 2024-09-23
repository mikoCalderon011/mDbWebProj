import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import { useParams } from 'react-router-dom'
import Footer from '../../components/Footer/Footer';
import { movieDataApi, movieImagesApi } from '../../api/api';
import ShowCollage from '../../components/Details/ShowCollage';

const MovieDetails = () => {
  const params = useParams();
  const [movieData, setMovieData] = useState();
  const [trailer, setTrailer] = useState();

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await movieDataApi(params.movieId.split('-')[0]);
        const responseImage = await movieImagesApi(params.movieId.split('-')[0]);

        const necessaryData = {
          backdrops: responseImage.backdrops,
          backdrop_path: response.backdrop_path,
          budget: response.budget,
          credits: response.credits,
          external_ids: response.external_ids,
          genres: response.genres,
          homepage: response.homepage,
          id: response.id,
          origin_country: response.origin_country,
          original_language: response.original_language,
          original_title: response.original_title,
          overview: response.overview,
          popularity: response.popularity,
          posters: responseImage.posters,
          poster_path: response.poster_path,
          recommendations: response.recommendations,
          release_date: response.release_date,
          release_dates: response.release_dates,
          revenue: response.revenue,
          runtime: response.runtime,
          status: response.released,
          tagline: response.tagline,
          title: response.title,
          videos: response.videos,
          vote_average: response.vote_average,
          vote_count: response.vote_count,
          watch_providers: response['watch/providers']
        }

        setMovieData(necessaryData);
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchMovieData();
  }, [params.movieId])

  console.log(movieData)

  if (movieData) {
    return (
      <>
        <Header />
        <main className='text-white flex flex-col font-roboto p-0'>
          <section
            className='w-full h-[52.9375rem] bg-cover bg-center relative flex justify-center'
            style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movieData.backdrop_path})` }}
          >
            <div className="absolute z-1 inset-0 bg-black opacity-90"></div>
            <div className='relative z-2 flex w-[66.5625rem] pt-[3.3125rem]'>
              <ShowCollage
                videos={movieData.videos}
                backdrops={movieData.backdrops}
                posters={movieData.posters}
                posterPath={movieData.poster_path}
              />
            </div>
          </section>
        </main>
        {/* <Footer /> */}
      </>
    )
  }
}

export default MovieDetails

/*
  - fetch data using the params -> probably create a useContext but build it from this file first and let's see how it will goes
  - after getting the movie data from the api pass it to components
  - go with the default settings (plan) first, we'll deal with the optionals later
*/