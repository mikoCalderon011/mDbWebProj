import React from 'react'
import IgopImg from '../../assets/Image/Igop.jpg'
import { Link } from 'react-router-dom'

const SearchResult = ({ data }) => {

   return (
      <Link 
         to={`/${data.streamType}/${data.id}`}
         className="search-result"
      >
         <div className="search-result-content">
            <img
               className="search-result-image"
               src={data.dataFour !== null ? `https://image.tmdb.org/t/p/original${data.dataFour}` : IgopImg}
               alt={data.dataOne}
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
