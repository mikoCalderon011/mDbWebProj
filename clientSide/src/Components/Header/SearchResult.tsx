import React from 'react'
import IgopImg from '../../assets/Image/Igop.jpg'

const SearchResult = ({ data }) => {
   return (
      <a 
         href='' 
         className='flex h-[7.8125rem] border-b-[1px] border-b-[#9D9D9D] text-black hover:bg-[#C0C0C0] active:bg-[#AFAFAF] dark:hover:bg-[#141c27] dark:active:bg-[#0f161e] dark:text-white dark:border-b-[#c9c9c9]'
      >
         <div className='flex gap-[1.0625rem] px-[0.8125rem] pt-[0.875rem]'>
            <img 
               className='w-[3.941875rem] h-[5.9375rem]'
               src={data.dataFour !== null ? `https://image.tmdb.org/t/p/original${data.dataFour}` : IgopImg} 
               alt={data.dataOne} 
            />
            <article className='w-[17.3125rem] flex flex-col'>
               <span className='font-roboto font-medium text-[1rem] truncate'>{data.dataOne}</span>
               <span className='font-roboto font-light text-[0.875rem] truncate'>{data.dataTwo}</span>
               <p className='font-roboto font-normal text-[0.75rem] truncate-multiline'>{data.dataThree}</p>
            </article>
         </div>
      </a>
   )
}

export default SearchResult
