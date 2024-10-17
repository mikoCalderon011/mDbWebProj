import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import { useParams } from 'react-router-dom';
import { dataApi, imagesApi } from '../../api/api';
import ShowCollage from '../../components/Details/ShowCollage';
import Overview from '../../components/Details/Overview';

const TvDetails = () => {
   const params = useParams();
   const [tvData, setTvData] = useState();

   useEffect(() => {
      const fetchTvData = async () => {
         try {
            const response = await dataApi('tv', params.tvId.split('-')[0]);
            const responseImage = await imagesApi('tv', params.tvId.split('-')[0]);

            // Change tab title
            document.title = response.name;

            // Data to pass on ShowCollage 
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
            const certifications = response.content_ratings.results.filter((country) =>
               [response.origin_country[0], "US"].includes(country.iso_3166_1)
            );

            const createdBy = response.created_by.filter((member) => {
               return member.name;
             }).slice(0, 3).map((writer) => writer.name);

            const stars = response.credits.cast.slice(0, 3).map((star) => star.name)

            console.log(createdBy)

            const overviewData = {
               type: 'tv',
               title: response.name,
               certifications:
                  certifications[0].rating ||
                  certifications[1]?.rating ||
                  undefined,
               release_date: new Date(response.first_air_date).toLocaleDateString('en-PH'),
               genres: response.genres.map((genre) => genre.name).splice(0, 3),
               vote_average: response.vote_average.toFixed(1),
               vote_count: ((response.vote_count / 1000).toFixed(1) + 'k'),
               tagline: response.tagline,
               overview: response.overview,
               // watch_providers: response['watch/providers'].results["PH"] ? response['watch/providers'].results["PH"].flatrate.map((provider) => provider.logo_path) : undefined,
               created_by: createdBy,
               stars,
               status: response.status,
               first_air_date: new Date(response.first_air_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
               }),
               last_air_date: new Date(response.last_air_date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
               }),
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
            }

            console.log(response)

            setTvData({
               backdrop_path: response.backdrop_path,
               showCollageData,
               overviewData
            })
         }
         catch (error) {
            console.error('Error fetching data:', error);
         }
      }

      fetchTvData();
   }, [params.tvId])

   // console.log(tvData)

   if (tvData) {
      return (
         <>
            <Header />
            <main className='text-white flex flex-col gap-0 font-roboto p-0'>
               <section
                  className='w-full h-[52.9375rem] bg-cover bg-center relative flex justify-center'
                  style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${tvData.backdrop_path})` }}
               >
                  <div className="absolute z-1 inset-0 bg-black opacity-90"></div>
                  <div className='relative z-2 flex w-[66.5625rem] pt-[3.3125rem] gap-[1.125rem]'>
                     <ShowCollage data={tvData.showCollageData} />
                     <Overview data={tvData.overviewData} />
                  </ div>
               </section>
            </main>
         </>
      )
   }
}

export default TvDetails
