import React from 'react';
import Header from '../../components/Header/Header';
import { useParams } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import { useQuery } from '@tanstack/react-query';
import { dataApi, imagesApi } from '../../api/api';
import ShowCollage from '../../components/Details/ShowCollage';
import Overview from '../../components/Details/Overview';
import Casts from '../../components/Details/Casts';
import Media from '../../components/Details/OverviewMedia';
import Recommendation from '../../components/Details/Recommendation';

// Fetch Movie Data
const fetchMovieData = async (movieId) => {
  const response = await dataApi('movie', movieId);
  const responseImage = await imagesApi('movie', movieId);
  return { response, responseImage };
};

const MovieDetails = () => {
  const { movieId } = useParams();
  const id = movieId.split('-')[0]; // Get the ID portion before the dash

  // Using React Query to fetch data
  const { data, error, isLoading } = useQuery({
    queryKey: ['movieData', id],
    queryFn: () => fetchMovieData(id),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error.message}</div>;

  const { response, responseImage } = data;

  // Change tab title
  document.title = response.title;

  // Gets the official trailer first, if not found, try to get a relevant trailer
  const officialTrailer = response.videos.results.filter(
    video => video.name.toLowerCase().includes('official') && video.name.toLowerCase().includes('trailer')
  );
  const trailer = officialTrailer.length > 0
    ? `https://www.youtube.com/embed/${officialTrailer[0].key}?si=8l7P2cs2GNCdH2-L`
    : response.videos.results.find(video => video.type === 'Trailer' && video.site === 'YouTube')
      ? `https://www.youtube.com/embed/${response.videos.results.find(video => video.type === 'Trailer' && video.site === 'YouTube').key}?si=8l7P2cs2GNCdH2-L`
      : null;

  // Helper functions
  const generateCountMessage = (count, singularLabel, pluralLabel) => {
    if (count > 99) {
      return `99+ ${pluralLabel}`;
    } else if (count > 1) {
      return `${count} ${pluralLabel}`;
    } else if (count === 1) {
      return `${count} ${singularLabel}`;
    } else {
      return `NO ${pluralLabel}`;
    }
  };

  const getRandomIndex = (count) => {
    return Math.floor(Math.random() * count);
  };

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
    poster_path: response.poster_path ? `https://image.tmdb.org/t/p/w500${response.poster_path}` : null,
    backdrop: randomBackdropIndex !== null ? `https://image.tmdb.org/t/p/w500${responseImage.backdrops[randomBackdropIndex].file_path}` : null,
    backdrop_count: backdropMessage,
    poster: randomPosterIndex !== null ? `https://image.tmdb.org/t/p/w500${responseImage.posters[randomPosterIndex].file_path}` : null,
    poster_count: posterMessage,
    video: randomVideoIndex !== null ? `https://i.ytimg.com/vi/${response.videos.results[randomVideoIndex].key}/hqdefault.jpg` : null,
    video_count: videoMessage,
    official_trailer: trailer
  };

  // Get Overview data
  const certifications = response.release_dates.results.filter((country) =>
    [response.origin_country[0], "US"].includes(country.iso_3166_1)
  );

  const director = response.credits.crew.find((member) => member.job === "Director");
  const writers = response.credits.crew.filter((member) => member.department === "Writing").slice(0, 3).map((writer) => writer.name);
  const stars = response.credits.cast.slice(0, 3).map((star) => star.name);

  const hours = response.runtime ? Math.floor(response.runtime / 60) : 0;
  const minutes = response.runtime ? response.runtime % 60 : 0;

  const overviewData = {
    type: 'movie',
    title: response.title,
    certifications:
      certifications[0]?.release_dates?.find(item => item.certification !== '')?.certification ||
      certifications[1]?.release_dates?.find(item => item.certification !== '')?.certification ||
      undefined,
    release_date: new Date(response.release_date).toLocaleDateString('en-PH'),
    genres: response.genres.map((genre) => genre.name).slice(0, 3),
    vote_average: response.vote_average.toFixed(1),
    vote_count: ((response.vote_count / 1000).toFixed(1) + 'k'),
    tagline: response.tagline,
    overview: response.overview,
    original_language: response.original_language,
    original_name: response.original_name,
    director: director ? director.name : undefined,
    writers: writers.length > 0 ? writers : undefined,
    stars,
    status: response.status,
    runtime: response.runtime ? `${hours} hour${hours !== 1 ? 's' : ''} and ${minutes} minute${minutes !== 1 ? 's' : ''}` : 'N/A',
    facebook_id: response.external_ids.facebook_id || undefined,
    twitter_id: response.external_ids.twitter_id || undefined,
    instagram_id: response.external_ids.instagram_id || undefined,
    wikidata: response.external_ids.wikidata_id || undefined,
    imdb_id: response.external_ids.imdb_id || undefined,
    homepage: response.homepage,
    budget: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(response.budget),
    revenue: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(response.revenue),
  };

  // Credits
  const credits = {
    type: 'movie',
    casts: response.credits.cast || undefined,
    director: director || undefined,
    writers: writers || undefined
  };

  // Media
  const medias = {
    videos: response.videos.results || undefined,
    posters: responseImage.posters || undefined,
    backdrops: responseImage.backdrops || undefined,
    logos: responseImage.logos || undefined
  };

  // Recommendations
  const recommendations = {
    recommendations: response.recommendations,
  };

  return (
    <>
      <main className='text-white flex flex-col gap-0 font-roboto p-0'>
        <section
          className='w-full h-[52.9375rem] bg-cover bg-center relative flex justify-center'
          style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${response.backdrop_path})` }}
        >
          <div className="absolute z-1 inset-0 bg-black opacity-90"></div>
          <div className='relative z-2 flex w-[66.5625rem] pt-[3.3125rem] gap-[1.125rem]'>
            <ShowCollage data={showCollageData} />
            <Overview data={overviewData} />
          </div>
        </section>
        <section className='w-[66.5625rem] flex gap-[1rem] pb-[2.875rem] pt-[1.3125rem]'>
          <section className='flex flex-col gap-[1.8125rem]'>
            <Casts data={credits} />
            <Media data={medias} />
          </section>
          <Recommendation data={recommendations} />
        </section>
      </main>
    </>
  );
};

export default MovieDetails;
