import React, { useEffect, useRef, useState } from 'react';
import SearchFilter from '../../components/Admin/SearchFilter';
import AddIcon from '../../assets/Icons/Admin/AddIcon';
import { fetchMyData } from '../../api/api';
import { LOCALHOST } from '../../App';
import TripleDotIcon from '../../assets/Icons/Admin/TripleDotIcon';
import ViewIcon from '../../assets/Icons/Admin/ViewIcon';
import EditIcon from '../../assets/Icons/Admin/EditIcon';
import DeleteIcon from '../../assets/Icons/Admin/DeleteIcon';

const AdminMovie = () => {
  const [movieList, setMovieList] = useState([]);
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const panelRef = useRef(null);

  useEffect(() => {
    const fetchMovieList = async () => {
      try {
        const response = await fetchMyData('movie');

        const getTrailerUrl = (videos) => {
          const officialTrailer =
            videos && videos.length > 0
              ? videos.find(
                video =>
                  video.name.toLowerCase().includes('official') &&
                  video.name.toLowerCase().includes('trailer')
              )
              : null;

          return officialTrailer
            ? `https://www.youtube.com/embed/${officialTrailer.key}?si=8l7P2cs2GNCdH2-L`
            : videos && videos.length > 0
              ? (() => {
                const foundVideo = videos.find(
                  video => video.type === 'Trailer' && video.site.toLowerCase() === 'youtube'
                );
                return foundVideo
                  ? `https://www.youtube.com/embed/${foundVideo.key}?si=8l7P2cs2GNCdH2-L`
                  : null;
              })()
              : null;
        };

        const movieData = response.data.map(movie => ({
          ...movie,
          trailer: getTrailerUrl(movie.videos),
        }));

        setMovieList(movieData);
      } catch (error) {
        console.error('Error fetching media data:', error);
      }
    };

    fetchMovieList();
  }, []);


  const handleViewInfo = (movie) => {
    setSelectedMovie(movie);
    setIsInfoVisible(true);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsInfoVisible(false);
      }
    };

    if (isInfoVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isInfoVisible]);

  console.log(selectedMovie);

  return (
    <div className="w-[55.75rem] flex flex-col gap-[1.4375rem]">
      <div className="w-full flex gap-[11.71875rem] items-center">
        <div className="flex gap-[2.25rem] items-center">
          <span className="text-[2.5rem] font-bold">Movies</span>
          <SearchFilter />
        </div>
        <button className="w-[9.25rem] h-[3.0625rem] flex items-center justify-center gap-[0.625rem] bg-[#CC511D] rounded-full">
          <AddIcon />
          <span className="text-[0.875rem]">Add Movie</span>
        </button>
      </div>
      {movieList.length > 0
        ? movieList.map((card) => (
          <div
            key={card._id}
            className="w-[13.1875rem] h-[16.4375rem] flex items-center justify-center rounded-[1rem] bg-cover bg-center relative"
            style={{
              backgroundImage: card._id
                ? `url(${LOCALHOST}/images/${card.backdrop_path})`
                : `url(https://placehold.co/211x263/png)`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#FFFFFF] to-black rounded-[1rem] opacity-70"></div>
            <div className="w-[10.9375rem] h-[14.1875rem] flex flex-col justify-between relative">
              <div className="w-[1.75rem] h-[1.75rem] rounded-full bg-[#D9D9D9] flex items-center justify-center ml-auto">
                <TripleDotIcon />
              </div>
              <div className="flex flex-col">
                <span className="w-[7.3125rem] font-semibold text-[1rem] line-clamp-1">{card.title}</span>
                <div className="w-full flex gap-[0.625rem] items-center">
                  <span className="w-[7.3125rem] font-roboto text-[0.75rem] text-[#999999] line-clamp-4">
                    {card.overview}
                  </span>
                  <button
                    onClick={() => handleViewInfo(card)}
                    className="w-[3rem] h-[3rem] flex items-center justify-center rounded-full bg-[#D9D9D9]"
                  >
                    <ViewIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
        : null}
      {isInfoVisible && (
        <>
          <div
            className={`fixed inset-0 bg-black ${isInfoVisible ? 'opacity-70' : 'opacity-0'
              } backdrop-blur-sm z-[3]`}
          ></div>
        </>
      )}
      {selectedMovie && (
        <div
          ref={panelRef}
          className={`w-[24.6875rem] h-full flex justify-center bg-[#111111] ${isInfoVisible
            ? 'opacity-100 z-[10] translate-x-0'
            : 'opacity-0 z-[0] translate-x-[100%]'
            } fixed top-0 right-0 transition-all duration-500 ease-in-out transform`}
        >
          <div className="w-[20.9375rem] flex flex-col gap-[1rem]">
            <div className="w-full mt-[3.25rem] flex justify-between">
              <span className="text-[#7066FF] underline">View Full Details</span>
              <div className='flex gap-[1.4375rem]'>
                <div className='flex items-center gap-[0.625rem]'>
                  <EditIcon />
                  <span>Edit</span>
                </div>
                <div className='flex items-center gap-[0.625rem] text-[#FF3333]'>
                  <DeleteIcon />
                  <span>Delete</span>
                </div>
              </div>
            </div>
            <iframe
              className='rounded-[1rem]'
              width="335"
              height="206"
              src={selectedMovie?.trailer || 'https://craftypixels.com/placeholder-image/335x206/999799/31317d'}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminMovie;
