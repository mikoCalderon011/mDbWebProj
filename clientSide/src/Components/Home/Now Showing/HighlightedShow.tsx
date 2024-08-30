import React, { useEffect, useState } from 'react'
import StarIcon from '../../../assets/Icons/StarIcon';
import WatchlistIconTwo from '../../../assets/Icons/WatchlistIconTwo';
import { WatchTrailerButton } from '../../Button/Buttons';

const HighlightedShow = ({ movieData }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideCount = movieData.length;

  useEffect(() => {
    const nextSlide = () => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slideCount);
    };

    const intervalId = setInterval(nextSlide, 5000);

    return () => clearInterval(intervalId);
  }, [slideCount]);

  return (
    <div className="w-[40.625rem] h-[28.125rem] relative flex justify-center items-center text-white font-roboto">
      {movieData.map((data, index) => (
        <div
          key={index}
          className={`w-full h-full absolute ${currentSlide === index ? 'block' : 'hidden'}`}
        >
          <img
            src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
            alt={data.title} 
            className={`w-full h-full absolute object-cover rounded-t-xl ${currentSlide === index ? 'block' : 'hidden'}`}
          />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(180deg, rgba(70,46,27,0) 0%, rgba(35,29,24,0) 60%, rgba(17,17,17,1) 95%)'
            }}
          ></div>
          <div className='absolute flex bottom-0 left-[1.875rem] gap-[1rem] items-center'>
            <img
              src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
              alt={data.title}
              className={`w-[8.4375rem] h-[12.1875rem] object-fill rounded-t-lg ${currentSlide === index ? 'block' : 'hidden'}`}
            />
            <figcaption className='flex flex-col'>
              <span className='text-[1.5rem] font-bold'>{data.title}</span>
              <div className='flex items-center gap-[1.3125rem]'>
                <span className='font-light'>
                  {new Date(data.release_date).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
                <div className='flex items-center gap-[0.4375rem]'>
                  <StarIcon />
                  <span className='font-medium'>{data.vote_average.toFixed(1)}</span>
                </div>
              </div>
              <div className='flex gap-[1.0625rem] mt-[0.8375rem]'>
                <WatchTrailerButton movieId={data.id}  />
                <button className='w-[2.5rem] h-[2.5rem] bg-[#5e5858] rounded-full flex justify-center items-center'>
                  <WatchlistIconTwo />
                </button>
              </div>
            </figcaption>
          </div>
        </div>
      ))}
    </div>
  )
}

export default HighlightedShow
