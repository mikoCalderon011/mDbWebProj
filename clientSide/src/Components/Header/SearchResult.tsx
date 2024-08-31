import React from 'react'
import IgopImg from '../../assets/Image/Igop.jpg'

const SearchResult = ({ data }) => {
   return (
      <a href='' class="search-result">
         <div class="search-result-content">
            <img
               class="search-result-image"
               src={data.dataFour !== null ? `https://image.tmdb.org/t/p/original${data.dataFour}` : IgopImg}
               alt={data.dataOne}
            />
            <article class="search-result-details">
               <span class="search-result-title">{data.dataOne}</span>
               <span class="search-result-subtitle">{data.dataTwo}</span>
               <p class="search-result-description">{data.dataThree}</p>
            </article>
         </div>
      </a>

   )
}

export default SearchResult
