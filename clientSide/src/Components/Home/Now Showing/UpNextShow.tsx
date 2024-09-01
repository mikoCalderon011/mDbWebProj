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
    <div className="up-next-container">
      <span className="up-next-title">Up next</span>
      <div className="up-next-cards">
        {seamlessLoopUpNextCards
          .slice(currentStartIndex + 1, currentStartIndex + cardsToShow + 1)
          .map((data, index) => (
            <div key={index} className="up-next-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${data.backdrop_path}`}
                alt={data.title}
                className="up-next-image"
              />
              <div className="up-next-gradient"></div>
              <figcaption className="up-next-details">
                <span className="up-next-movie-title">{data.title}</span>
                <div className="up-next-meta">
                  <span className="up-next-release-date">
                    {new Date(data.release_date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <div className="up-next-rating">
                    <StarIcon />
                    <span className="up-next-score">
                      {data.vote_average.toFixed(1)}
                    </span>
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
