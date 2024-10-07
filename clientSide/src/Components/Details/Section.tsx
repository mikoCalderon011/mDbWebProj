import React from 'react'
import LeftSIcon from '../../assets/Icons/LeftSIcon'
import { Link, useLocation } from 'react-router-dom'

const Section = ({ data }) => {
   const location = useLocation();
   const basePath = location.pathname.split('/').slice(0, 3).join('/');

   return (
      <div className='w-[66.5rem] h-[18.75rem] mt-[3.3125rem] relative flex items-end'>
         <img
            className='w-full h-full object-cover rounded-[0.625rem] absolute'
            src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
            alt=''
         />
         <div className="absolute z-1 inset-0 bg-black opacity-50"></div>
         <div className='flex flex-col relative pl-[3.3125rem] pb-[1.25rem]'>
            <Link 
               to={basePath} 
               className='w-[5.4375rem] h-[2.0625rem] flex items-center justify-center bg-[#1C252F] rounded-full text-[.875rem] gap-[0.546875rem]'
            >
               <LeftSIcon /> Back
            </Link>
            <span className='text-[1.625rem]'>{data.title} <span className='text-[1.25rem] text-[#9E9E9E]'>({data.release_date})</span></span>
            <span 
               className='font-passionOne text-[4.875rem] font-bold leading-none'
            >
               {data.section_title} 
               <span className='text-[#FF8731]'>!</span>
            </span>
         </div>
      </div>
   )
}

export default Section
