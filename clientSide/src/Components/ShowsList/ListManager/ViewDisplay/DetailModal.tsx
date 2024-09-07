import React, { useContext, useEffect, useState } from 'react'
import XIcon from '../../../../assets/Icons/XIcon';
import StarIcon from '../../../../assets/Icons/StarIcon';
import StarOutline from '../../../../assets/Icons/StarOutline';
import PlayIcon from '../../../../assets/Icons/PlayIcon';
import PlusIcon from '../../../../assets/Icons/PlusIcon';
import { Context } from '../../../../pages/MovieList';
import { certificationsDetail, movieDetailModal } from '../../../../api/api';

const DetailModal = ({ movieId, exitModal }) => {
   const { filters } = useContext(Context);
   const [movieDetails, setMovieDetails] = useState(null);

   // Convert total minutes to hh-mm format
   const formatRuntime = (minutes) => {
      if (!minutes) return 'N/A';
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours}hr ${mins}min`;
   };

   useEffect(() => {
      const fetchMovieDetails = async () => {
         try {
            const movieDetailOne = await movieDetailModal(movieId);
            const movieDetailTwo = await certificationsDetail(movieId);

            const releaseYear = movieDetailOne.release_date ? movieDetailOne.release_date.split('-')[0] : 'N/A';

            const formattedRuntime = formatRuntime(movieDetailOne.runtime);

            const countryCode = filters.certification.certCountry;
            const countryCertifications = movieDetailTwo.results?.find(cert => cert.iso_3166_1 === countryCode);
            const certification = countryCertifications?.release_dates?.[0]?.certification ||
               movieDetailTwo.results?.find(cert => cert.iso_3166_1 === 'US')?.release_dates?.[0]?.certification ||
               'N/A'
               ;

            const officialTrailerVideos = movieDetailOne.videos.results.filter(
               video => video.name.toLowerCase().includes('official') && video.name.toLowerCase().includes('trailer') && video.site === 'YouTube'
            );
            const trailer = officialTrailerVideos.length > 0
               ? `https://www.youtube.com/watch?v=${officialTrailerVideos[0].key}`
               : movieDetailOne.videos.results.find(video => video.type === 'Trailer' && video.site === 'YouTube')
                  ? `https://www.youtube.com/watch?v=${movieDetailOne.videos.results.find(video => video.type === 'Trailer' && video.site === 'YouTube').key}`
                  : 'No trailer available'
               ;

            // Grabs only the necessary information to display the movie detail
            const grabNeededDetail = {
               poster_path: movieDetailOne.poster_path,
               title: movieDetailOne.title,
               release_date: releaseYear,
               runtime: formattedRuntime,
               certification,
               genres: movieDetailOne.genres.map(genre => genre.name),
               vote_average: movieDetailOne.vote_average.toFixed(1),
               overview: movieDetailOne.overview,
               director: movieDetailOne.credits.crew.find(crewMember => crewMember.job === "Director")?.name || 'N/A',
               actors: movieDetailOne.credits.cast.slice(0, 3).map(actor => `${actor.name} as ${actor.character}`),
               trailer
            };

            setMovieDetails(grabNeededDetail);
         }
         catch (error) {
            console.log("Error during fetching of movie details", error)
         }
      }

      fetchMovieDetails();
   }, [movieId, filters.certification.certCountry])

   // console.log(movieDetails);

   if (!movieDetails) {
      return <div>Loading...</div>;
   }

   return (
      <div className='w-screen h-screen top-0 left-0 right-0 bottom-0 fixed z-[10] flex items-center justify-center '>
         <div className='w-screen h-screen top-0 left-0 right-0 bottom-0 fixed bg-[#111111] opacity-50' />
         <div className='w-[41.5rem] h-[22.5rem] bg-[#1b1b1b] z-[10] relative rounded-[10px] overflow-auto'>
            <div className='w-full h-full flex flex-col gap-[1.625rem] p-[1.5rem]'>
               <div className='flex w-full gap-[1.1875rem]'>
                  <img
                     src={`https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`}
                     alt={movieDetails.title}
                     className='w-[4.5rem] h-[6.625rem] object-cover rounded-[0.625rem]'
                  />
                  <div className='w-full flex flex-col gap-[.2rem] font-roboto'>
                     <div className='flex items-center justify-between w-full'>
                        <span className='text-[1.5rem] font-bold'>{movieDetails.title}</span>
                        <button
                           className='h-[2rem] w-[2rem] bg-[#1C252F] flex items-center justify-center rounded-full'
                           onClick={() => exitModal(null)}
                        >
                           <XIcon />
                        </button>
                     </div>
                     <div className='flex gap-[1.5rem] text-[0.875rem]'>
                        <span>{movieDetails.release_date}</span>
                        <span>{movieDetails.runtime}</span>
                        <span>{movieDetails.certification}</span>
                     </div>
                     <div className='flex items-center gap-[1.5rem] text-[0.875rem]'>
                        {movieDetails.genres.map(genre => {
                           return (
                              <span>{genre}</span>
                           )
                        })}
                     </div>
                     <div className='flex gap-[2.625rem] text-[1rem] font-bold'>
                        <div className='flex gap-[0.3625rem]'>
                           <StarIcon />
                           <span>{movieDetails.vote_average}</span>
                        </div>
                        <div className='flex gap-[0.3625rem]'>
                           <StarOutline />
                           <span>0</span>
                        </div>
                     </div>
                  </div>
               </div>
               <div className='flex flex-col gap-[0.8125rem] text-[0.875rem]'>
                  <p>{movieDetails.overview}</p>
                  <div className='flex gap-[1.0625rem]'>
                     <span className='font-bold text-[#9F9F9F]'>Director</span>
                     <a
                        href={`https://www.google.com/search?q=${movieDetails.director}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className='text-blue-500 underline hover:text-blue-700'
                     >
                        {movieDetails.director}
                     </a>
                  </div>
                  <div className='flex gap-[1.0625rem]'>
                     <span className='font-bold text-[#9F9F9F]'>Stars</span>
                     {movieDetails.actors.map(actor => {
                        return (
                           <span>{actor}</span>
                        )
                     })}
                  </div>
                  <div className='flex gap-[0.5rem] pb-[2rem]'>
                     <a 
                        href={`${movieDetails.trailer}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className='w-[18.75rem] h-[2.25rem] bg-[#1C252F] flex justify-center items-center gap-[0.553rem] rounded-full'
                     >
                        <PlayIcon />
                        <span className='font-bold'>Trailer</span>
                     </a>
                     <button className='w-[18.75rem] h-[2.25rem] bg-[#1C252F] flex justify-center items-center gap-[0.553rem] rounded-full'>
                        <PlusIcon />
                        <span className='font-bold text-[#3D81E7]'>Watchlist</span>
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default DetailModal
