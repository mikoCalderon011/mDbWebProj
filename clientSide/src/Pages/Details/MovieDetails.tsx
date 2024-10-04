import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import { useParams } from 'react-router-dom'
import Footer from '../../components/Footer/Footer';
import { dataApi, imagesApi } from '../../api/api';
import ShowCollage from '../../components/Details/ShowCollage';
import Overview from '../../components/Details/Overview';
import Casts from '../../components/Details/Casts';
import Media from '../../components/Details/Media';
import Recommendation from '../../components/Details/Recommendation';

const MovieDetails = () => {
  const params = useParams();
  const [movieData, setMovieData] = useState();

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const response = await dataApi('movie', params.movieId.split('-')[0]);
        const responseImage = await imagesApi('movie', params.movieId.split('-')[0]);

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

        // Get Overview data

        // get PH or US certification

        const certifications = response.release_dates.results.filter((country) =>
          [response.origin_country[0], "US"].includes(country.iso_3166_1)
        );

        const director = response.credits.crew.find((member) => {
          return member.job === "Director"
        })

        const writers = response.credits.crew.filter((member) => {
          return member.department === "Writing";
        }).slice(0, 3).map((writer) => writer.name);

        const stars = response.credits.cast.slice(0, 3).map((star) => star.name)

        // ill do the watch providers later or maybe next time
        // console.log(response)

        const overviewData = {
          title: response.title,
          certifications:
            certifications[0]?.release_dates?.find(item => item.certification !== '')?.certification ||
            certifications[1]?.release_dates?.find(item => item.certification !== '')?.certification ||
            undefined,
          release_date: new Date(response.release_date).toLocaleDateString('en-PH'),
          genres: response.genres.map((genre) => genre.name).splice(0, 3),
          vote_average: response.vote_average.toFixed(1),
          vote_count: ((response.vote_count / 1000).toFixed(1) + 'k'),
          tagline: response.tagline,
          overview: response.overview,
          // watch_providers: response['watch/providers'].results["PH"] ? response['watch/providers'].results["PH"].flatrate.map((provider) => provider.logo_path) : undefined,
          director: director ? director.name : undefined,
          writers: writers || undefined,
          stars,
          status: response.status,
          facebook_id: response.external_ids.facebook_id
            ? response.external_ids.facebook_id
            : undefined,
          twitter_id: response.external_ids.twitter_id
            ? response.external_ids.twitter_id
            : undefined,
          instagram_id: response.external_ids.instagram_id
            ? response.external_ids.instagram_id
            : undefined,
          wikidata: response.external_ids.wikidata_id
            ? response.external_ids.wikidata_id
            : undefined,
          imdb_id: response.external_ids.imdb_id
            ? response.external_ids.imdb_id
            : undefined,
          homepage: response.homepage,
          budget: new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(response.budget),
          revenue: new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
          }).format(response.revenue),
        }

        // Credits
        const credits = {
          casts: response.credits.cast || undefined,
          director: director || undefined,
          writers: writers || undefined
        }

        // Media
        const medias = {
          videos: response.videos.results || undefined,
          posters: responseImage.posters || undefined,
          backdrops: responseImage.backdrops || undefined,
          logos: responseImage.logos || undefined
        }

        // Recommendations
        const recommendations = {
          recommendations: response.recommendations,
        }

        // const necessaryData = {
        //   backdrops: responseImage.backdrops,
        //   backdrop_path: response.backdrop_path,
        //   budget: response.budget,
        //   credits: response.credits,
        //   external_ids: response.external_ids,
        //   genres: response.genres,
        //   homepage: response.homepage,
        //   id: response.id,
        //   origin_country: response.origin_country,
        //   original_language: response.original_language,
        //   original_title: response.original_title,
        //   overview: response.overview,
        //   popularity: response.popularity,
        //   posters: responseImage.posters,
        //   poster_path: response.poster_path,
        //   recommendations: response.recommendations,
        //   release_date: response.release_date,
        //   release_dates: response.release_dates,
        //   revenue: response.revenue,
        //   runtime: response.runtime,
        //   status: response.released,
        //   tagline: response.tagline,
        //   title: response.title,
        //   videos: response.videos,
        //   vote_average: response.vote_average,
        //   vote_count: response.vote_count,
        //   watch_providers: response['watch/providers']
        // }

        setMovieData({
          backdrop_path: response.backdrop_path,
          showCollageData,
          overviewData,
          credits,
          medias,
          recommendations
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
        <main className='text-white flex flex-col gap-0 font-roboto p-0'>
          <section
            className='w-full h-[52.9375rem] bg-cover bg-center relative flex justify-center'
            style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movieData.backdrop_path})` }}
          >
            <div className="absolute z-1 inset-0 bg-black opacity-90"></div>
            <div className='relative z-2 flex w-[66.5625rem] pt-[3.3125rem] gap-[1.125rem]'>
              <ShowCollage data={movieData.showCollageData} />
              <Overview data={movieData.overviewData} />
            </div>
          </section>
          <section
            className='w-[66.5625rem] flex gap-[1rem] pb-[2.875rem] pt-[1.3125rem]'
          >
            <section className='flex flex-col gap-[1.8125rem]'>
              <Casts data={movieData.credits} />
              <Media data={movieData.medias} />
            </section>
            <Recommendation data={movieData.recommendations}/>
          </section>
        </main>
        <Footer />
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