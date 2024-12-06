import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { NavLink, useParams } from 'react-router-dom';
import { getMyMovieDataApi } from '../../api/api';
import EditIcon from '../../assets/Icons/Admin/EditIcon';
import StarLIcon from '../../assets/Icons/StarLIcon';

const fetchMovieData = async (movieId) => {
  const response = await getMyMovieDataApi('movie', movieId);

  document.title = response.movie.title;

  const officialTrailer = (response.movie.videos && response.movie.videos.length > 0)
    ? response.movie.videos.filter(
      video => video.name.toLowerCase().includes('official') && video.name.toLowerCase().includes('trailer')
    )
    : (!response.movie.videos ? response.movie.videos.filter(
      video => video.name.toLowerCase().includes('official') && video.name.toLowerCase().includes('trailer')
    ) : 0
    );

  const trailer = officialTrailer.length > 0
    ? `https://www.youtube.com/embed/${officialTrailer[0].key}?si=8l7P2cs2GNCdH2-L`
    : response.movie?.videos
      ? (() => {
        const foundVideo = response.movie.videos.find(video => video.type === 'Trailer' && video.site === 'Youtube');
        return foundVideo ? `https://www.youtube.com/embed/${foundVideo.key}?si=8l7P2cs2GNCdH2-L` : null;
      })()
      : response.movie.videos
        ? (() => {
          const foundVideo = response.movie.videos.find(video => video.type === 'Trailer' && video.site === 'Youtube');
          return foundVideo ? `https://www.youtube.com/embed/${foundVideo.key}?si=8l7P2cs2GNCdH2-L` : null;
        })()
        : null;

  const certifications = response.movie.release_dates?.results.filter((country) =>
    [response.movie.origin_country[0], "US"].includes(country.iso_3166_1)
  );

  const director = response.movie.credits.crew.find((member) => member.job === "Director");
  const writers = response.movie.credits.crew.filter((member) => member.department === "Writing").slice(0, 3).map((writer) => writer.name);
  const stars = response.movie.credits.cast.slice(0, 3).map((star) => star.name);

  const hours = response.movie.runtime ? Math.floor(response.movie.runtime / 60) : 0;
  const minutes = response.movie.runtime ? response.movie.runtime % 60 : 0;

  return {
    ...response.movie,
    trailer: trailer,
    certifications:
      certifications[0]?.release_dates?.find(item => item.certification !== '')?.certification ||
      certifications[1]?.release_dates?.find(item => item.certification !== '')?.certification ||
      undefined,
    director: director ? director.name : undefined,
    writers: writers.length > 0 ? writers : undefined,
    stars: stars,
    runtime: response.movie.runtime ? `${hours} hour${hours !== 1 ? 's' : ''} and ${minutes} minute${minutes !== 1 ? 's' : ''}` : 'N/A',
    budget: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(response.movie.budget),
    revenue: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(response.movie.budget),
    vote_average: response.movie.vote_average.toFixed(1) || 0,
    vote_count: ((response.movie.vote_count / 1000).toFixed(1) + 'k'),
    genres: response.movie.genres.map((genre) => genre.name).slice(0, 3),
    release_date: new Date(response.movie.release_date).toLocaleDateString('en-PH'),
  };
};

const AdminMovieDetails = () => {
  const { movieId } = useParams();

  const { data, error, isLoading } = useQuery({
    queryKey: ['movieData', movieId],
    queryFn: () => fetchMovieData(movieId),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching data: {error.message}</div>;

  console.log(data);

  return (
    <div className="w-[66.1875rem] h-auto flex flex-col font-roboto">
      <div className='w-full h-[30.6875rem] relative'>
        <div className='w-full h-[26.6875rem] absolute z-[5]'>
          <div className='absolute inset-0 bg-gradient-to-b from-[rgba(17,17,17,0)] to-[rgba(17,17,17,1)]'></div>
          <img
            className='w-full h-full object-cover rounded-[1rem]'
            src={`http://localhost:3000/images/${data.backdrop_path}`}
            alt={data.original_title || data.title}
          />
          <NavLink
            to={'edit'}
            className='h-[3.0625rem] absolute top-0 right-0 mt-[1.8125rem] mr-[1.8125rem] px-[1.375rem] flex items-center justify-center gap-[0.625rem] rounded-full bg-[#CC511D]'
          >
            <EditIcon />
            <span>Edit Movie</span>
          </NavLink>
        </div>
        <div className='w-[60.0625rem] absolute bottom-0 z-[7] flex gap-[1.625rem]'>
          <div className='w-[11.8125rem] h-[16.375rem] rounded-[.75rem]'>
            <img
              className='w-full h-full object-cover rounded-[1rem]'
              src={`http://localhost:3000/images/${data.poster_path}`}
              alt={data.original_title || data.title}
            />
          </div>
          <div className='w-[46.6875rem]'>
            <span className='font-bold text-[2rem]'>{data.title || data.original_title}</span>
            <div className='flex gap-[1.3125rem]'>
              <span className='border border-white border-solid px-[5px] py-[2px]'>{data.certifications}</span>
              <div className='flex gap-[0.3125rem] items-center'>
                <StarLIcon />
                <div className='flex gap-[0.1875rem]'>
                  <div className='flex flex-col leading-[1]'>
                    <span className='text-[1.25rem] font-bold'>{data.vote_average}</span>
                    <span className='text-[0.75rem] text-[#8F8F8F] font-semibold'>{data.vote_count}</span>
                  </div>
                  <span className='font-semibold text-[#8F8F8F]'>/10</span>
                </div>
              </div>
              <span>
                {data.release_date}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminMovieDetails
