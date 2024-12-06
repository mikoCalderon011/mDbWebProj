import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { languages } from '../../../api/api';
import DividerTwo from '../../Details/DividerTwo';

const fetchImageData = async (movieData, mediaType) => {
   const response = await languages();

   const languageMap = response.reduce((acc, lang) => {
      acc[lang.iso_639_1] = lang.english_name || lang.name;
      return acc;
   }, {});

   const groupedImagesByLang = movieData.images[mediaType].reduce((acc, lang) => {
      const langKey = languageMap[lang.iso_639_1] || lang.iso_639_1 || 'No Language';
      if (!acc[langKey]) {
         acc[langKey] = [];
      }
      acc[langKey].push(lang);
      return acc;
   }, {});

   return {
      media: groupedImagesByLang
   }
}

const Images = ({ movieData }) => {
   const { movieId } = useParams();
   const [selectedImageType, setSelectedImageType] = useState('posters');

   const { data, error, isLoading } = useQuery({
      queryKey: ['movieData', movieId, selectedImageType],
      queryFn: () => fetchImageData(movieData, selectedImageType),
   });

   if (isLoading) return <div>Loading...</div>;
   if (error) return <div>Error fetching data: {error.message}</div>;

   console.log(data);

   return (
      <div className='w-full h-[35.5625rem]'>
         <div className='w-full h-[2.1875rem] flex items-center justify-between gap-[1rem]'>
            <span className='text-[1.875rem] font-bold'>Images</span>
            <div className='flex items-center gap-[2.375rem]'>
               <div onClick={() => setSelectedImageType('posters')} className='flex gap-[.5rem] items-center cursor-pointer'>
                  <span className='text-[1.125rem] font-bold'>Posters</span>
                  <span className='text-[.875rem] text-[#B1B1B1] font-bold'>{movieData.images.posters.length}</span>
               </div>
               <div onClick={() => setSelectedImageType('backdrops')} className='flex gap-[.5rem] items-center cursor-pointer'>
                  <span className='text-[1.125rem] font-bold'>Backdrops</span>
                  <span className='text-[.875rem] text-[#B1B1B1] font-bold'>{movieData.images.backdrops.length}</span>
               </div>
               <div onClick={() => setSelectedImageType('logos')} className='flex gap-[.5rem] items-center cursor-pointer'>
                  <span className='text-[1.125rem] font-bold'>Logos</span>
                  <span className='text-[.875rem] text-[#B1B1B1] font-bold'>{movieData.images.logos.length}</span>
               </div>
               <div className='w-[32.875rem]'>
                  <DividerTwo />
               </div>
            </div>
         </div>
      </div>
   )
}

export default Images

