import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import { useParams } from 'react-router-dom'
import Footer from '../../components/Footer/Footer';
import { movieDataApi, movieImagesApi } from '../../api/api';
import ShowCollage from '../../components/Details/ShowCollage';

const MovieDetails = () => {
  const params = useParams();
  const [movieData, setMovieData] = useState();

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await movieDataApi(params.movieId.split('-')[0]);
        const responseImage = await movieImagesApi(params.movieId.split('-')[0]);

        // Data to pass on ShowCollage 

        // Gets the official trailer first, if not found, try to get relevant trailer
        const officialTrailer = response.videos.results.filter(
          video => video.name.toLowerCase().includes('official') && video.name.toLowerCase().includes('trailer')
        );
        const trailer = officialTrailer.length > 0
          ? `https://www.youtube.com/embed/${officialTrailer[0].key}?si=8l7P2cs2GNCdH2-L`
          : response.videos.results.find(video => video.type === 'Trailer' && video.site === 'YouTube')
            ? `https://www.youtube.com/embed/${response.videos.results.find(video => video.type === 'Trailer' && video.site === 'YouTube').key}?si=8l7P2cs2GNCdH2-L`
            : null
          ;

        function generateCountMessage(count, singularLabel, pluralLabel) {
          if (count > 99) {
            return `99+ ${pluralLabel}`;
          }
          else if (count > 1) {
            return `${count} ${pluralLabel}`;
          }
          else if (count === 1) {
            return `${count} ${singularLabel}`;
          }
          else {
            return `NO ${pluralLabel}`;
          }
        }

        function getRandomIndex(count) {
          return Math.floor(Math.random() * count);
        }

        const backdropCount = responseImage.backdrops?.length || 0;
        const backdropMessage = generateCountMessage(backdropCount, 'BACKDROP', 'BACKDROPS');

        const posterCount = responseImage.posters?.length || 0;
        const posterMessage = generateCountMessage(posterCount, 'POSTER', 'POSTERS');

        const videosCount = response.videos.results?.length || 0;
        const videoMessage = generateCountMessage(videosCount, 'VIDEO', 'VIDEOS');

        // Gets random index based on the total count of data
        const randomBackdropIndex = backdropCount > 0 ? getRandomIndex(backdropCount) : null;
        const randomPosterIndex = posterCount > 0 ? getRandomIndex(posterCount) : null;
        const randomVideoIndex = videosCount > 0 ? getRandomIndex(videosCount) : null;

        const showCollageData = {
          title: response.title,
          poster_path: response.poster_path !== null ? `https://image.tmdb.org/t/p/w500${response.poster_path}` : null,
          backdrop: randomBackdropIndex !== null ? `https://image.tmdb.org/t/p/w500${responseImage.backdrops[randomBackdropIndex].file_path}` : null,
          backdrop_count: backdropMessage,
          poster: randomPosterIndex !== null ? `https://image.tmdb.org/t/p/w500${responseImage.posters[randomPosterIndex].file_path}` : null,
          poster_count: posterMessage,
          video: randomVideoIndex !== null ? `https://i.ytimg.com/vi/${response.videos.results[randomVideoIndex].key}/hqdefault.jpg` : null,
          video_count: videoMessage,
          official_trailer: trailer
        };

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

        setMovieData({
          backdrop_path: response.backdrop_path,
          showCollageData
        });
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchMovieData();
  }, [params.movieId])

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
                data={movieData.showCollageData}
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