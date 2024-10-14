import React, { useState } from 'react'

const Videos = ({ data }) => {
   const videoType = ['Trailer', 'Teaser', 'Clip', 'Behind the Scenes', 'Bloopers', 'Featurette'];

   const initialType = videoType.find(type => data[type]) || null;
   const [selectedType, setSelectedType] = useState(initialType);

   console.log(data)

   if (data) {
      return (
         <div className='w-[66.5rem] flex py-[3.3125rem] gap-[3.6875rem]'>
            <ul className='w-[15.9375rem] h-full flex flex-col flex-grow-0 gap-[1.1875rem] py-[2.5625rem] px-[1.625rem] rounded-md border-solid border-[#1A1A1A] border-[1px]'>
               {videoType.map((type) => {
                  return (
                     <li
                        key={type}
                        className='w-[12.6875rem] font-light text-[0.9375rem] flex justify-between cursor-pointer'
                        onClick={() => setSelectedType(type)}
                     >
                        <span>{type}</span>
                        <span>{data[type] ? data[type].length : 0}</span>
                     </li>
                  )
               })}
            </ul>
            <div className={`w-[46.875rem] h-full flex flex-col flex-grow-0 flex-wrap gap-[1.7rem]`}>
               {data[selectedType].map((video, index) => {
                  return (
                     <img
                        key={index}
                        src={`https://i.ytimg.com/vi/${video.key}/hqdefault.jpg`}
                        className={`w-[22.5625rem] h-[12.691375rem] object-cover`}
                     />
                  )
               })}
            </div>
         </div>
      )
   }
}

export default Videos
