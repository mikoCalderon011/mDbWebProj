import React, { useState } from 'react'
import MiguImg from '../../../../assets/Image/miguwallpaper.jpg'
import StarIcon from '../../../../assets/Icons/StarIcon';
import PlusIcon from '../../../../assets/Icons/PlusIcon';
import InfoIcon from '../../../../assets/Icons/InfoIcon';
import DetailModal from './DetailModal';

const CompactView = ({ movies }) => {
  const [activeDetailModal, setActiveDetailModal] = useState(null);

  return (
    <div className='flex w-[66.5625rem] gap-[1.375rem] flex-wrap'>
      {movies?.map(movie => {
        return (
          <div
            key={movie.id}
            className='w-[21.2708rem] h-[6.25rem] bg-[#1A1A1A] flex flex-col gap-[0.9375rem] rounded-[0.625rem] relative cursor-pointer z-[2] hover:scale-[1.02]'
          >
            <img
              src={movie.backdrop_path !== null ? `https://image.tmdb.org/t/p/w500` + movie.backdrop_path : MiguImg}
              alt={movie.original_title}
              className='absolute h-full w-full rounded-[0.625rem] object-cover'
            />
            <div class="absolute inset-0 rounded-lg bg-gradient-to-r from-[#111111] via-transparent to-[#111111]/0"></div>
            <div className='w-full h-full flex absolute items-end'>
              <div className='w-full flex items-center justify-around pb-[.5rem]'>
                <div className='flex flex-col w-[65%]'>
                  <span className='text-[1.125rem] font-[500] truncate'>{movie.title}</span>
                  <div className='flex gap-[1rem] font-light'>
                    <span>
                      {new Date(movie.release_date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                    <div className='flex gap-[.5rem]'>
                      <StarIcon />
                      <span>{movie.vote_average?.toFixed(1)}</span>
                    </div>
                  </div>
                </div>
                <div className='flex gap-[0.6975rem]'>
                  <button className='h-[2rem] w-[2rem] rounded-full bg-[#1C252F] flex items-center justify-center hover:bg-[#2b3947] transition-colors duration-200'>
                    <PlusIcon />
                  </button>
                  <button
                    className='h-[2rem] w-[2rem] rounded-full bg-[#1C252F] flex items-center justify-center hover:bg-[#2b3947] transition-colors duration-200'
                    onClick={() => setActiveDetailModal(movie.id)}
                  >
                    <InfoIcon />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      })}
      {activeDetailModal !== null
        ? <DetailModal movieId={activeDetailModal} exitModal={setActiveDetailModal} />
        : null
      }
    </div>
  )
}

export default CompactView
