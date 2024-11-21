import React from 'react'
import IgopImg from '../../../assets/Image/Igop.jpg'
import { Link } from 'react-router-dom'
import { LOCALHOST } from '../../../App'

const SearchResult = ({ data }) => {
   console.log(data)
   return (
      <Link
         to={`/${data.streamType}/${data.id}`}
         className="search-result"
      >
         <div className="search-result-content">
            <img
               className="search-result-image"
               src={`https://image.tmdb.org/t/p/w500${data.dataFour}`}
               alt={data.dataOne}
               onError={(e) => {
                  e.target.onerror = null;
                  e.target.onerror = () => { // Second fallback for the placeholder
                     e.target.src = IgopImg;
                  };
                  e.target.src = `${LOCALHOST}/images/${data.dataFour}`; // First fallback to your backend image
               }}
            />
            <article className="search-result-details">
               <span className="search-result-title">{data.dataOne}</span>
               <span className="search-result-subtitle">{data.dataTwo}</span>
               <p className="search-result-description">{data.dataThree}</p>
            </article>
         </div>
      </Link>
   )
}

export default SearchResult
