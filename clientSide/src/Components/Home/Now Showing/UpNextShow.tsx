import React, { useEffect, useState } from 'react'
import StarIcon from '../../../assets/Icons/StarIcon'

const UpNextShow = ({ movieData }) => {
  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  const cardsToShow = 3;
  const slideCount = movieData.length;

  useEffect(() => {
    const nextSlide = () => {
      setCurrentStartIndex((prevStartIndex) =>
        (prevStartIndex + 1) % slideCount
      );
    };

    const intervalId = setInterval(nextSlide, 5000);

    return () => clearInterval(intervalId);
  }, [slideCount]);

  const seamlessLoopUpNextCards = [
    ...movieData,
    ...movieData.slice(0, cardsToShow)
  ];


  return (
    <div className='w-[24.25rem] flex flex-col gap-[1rem] font-roboto text-white'>
      <span className='text-[1.5rem] font-extrabold text-[#FF8731]'>Up next</span>
      <div className='flex flex-col gap-[1.5625rem]'>
        {seamlessLoopUpNextCards.slice(currentStartIndex + 1, currentStartIndex + cardsToShow + 1).map((data, index) => (
          <div
            key={index}
            className='flex gap-[0.875rem] bg-[#1C1C1C] rounded-lg flex-none w-[24.25rem] relative'
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${data.backdrop_path}`}
              alt={data.title}
              className='w-[24.25rem] h-[7rem] object-cover rounded-lg'
            />
            <div
              className="absolute inset-0 rounded-lg"
              style={{
                backgroundImage:
                  'linear-gradient(245deg, rgba(70,46,27,0) 0%, rgba(35,29,24,0) 47%, rgba(23,23,23,1) 100%)'
              }}
            ></div>
            <figcaption className='flex flex-col justify-evenly absolute left-0 bottom-0 pb-[1rem] pl-[1.5rem]'>
              <span className='text-[1.25rem] font-bold'>{data.title}</span>
              <div className='flex gap-[.9606rem]'>
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
            </figcaption>
          </div>
        ))}
      </div>
    </div>
  )
}

export default UpNextShow
