import React from 'react'
import BackdropIcon from '../../assets/Icons/BackdropIcon'
import VideoIcon from '../../assets/Icons/VideoIcon'
import PosterIcon from '../../assets/Icons/PosterIcon'

const ShowCollage = ({ data }) => {
   return (
      <div className='flex flex-col gap-[0.5rem] w-[37.125rem] h-[45.25rem] font-roboto text-[0.75rem] font-bold'>
         <iframe
            className='rounded-[10px]'
            width="594"
            height="334"
            src={data.official_trailer || 'https://craftypixels.com/placeholder-image/594x334/999799/31317d'}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
         />
         <div className='flex gap-[0.5rem]'>
            <img
               className='w-[13.4375rem] h-[23.625rem] object-cover rounded-[10px]'
               src={data.poster_path || 'https://craftypixels.com/placeholder-image/215x378/999799/31317d'}
               alt={data.name}
            />
            <div className='flex flex-col gap-[0.5rem]'>
               <div className='flex gap-[0.5rem]'>
                  <div
                     className={`w-[11.3125rem] h-[11.5625rem] flex justify-center items-center rounded-[10px] overflow-hidden relative group hover:outline-dotted ${data.poster ? 'cursor-pointer' : 'cursor-default pointer-events-none'}`}
                  >
                     <img
                        className='w-full h-full absolute object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-110'
                        src={data.poster || 'https://craftypixels.com/placeholder-image/181x185/999799/31317d'}
                        alt={`${data.name} Posters`}
                     />
                     <div className="absolute z-[2] inset-0 bg-black opacity-70 group-hover:opacity-60 group-active:opacity-40" />
                     <div className='flex flex-col items-center gap-[0.4375rem] relative z-[3]'>
                        <PosterIcon />
                        <span>{data.poster_count}</span>
                     </div>
                  </div>
                  <div
                     className={`w-[11.3125rem] h-[11.5625rem] flex justify-center items-center rounded-[10px] overflow-hidden relative group hover:outline-dotted ${data.video ? 'cursor-pointer' : 'cursor-default pointer-events-none'}`}
                  >
                     <img
                        className='w-full h-full absolute object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-110'
                        src={data.video || `https://craftypixels.com/placeholder-image/181x185/999799/31317d`}
                        alt={`${data.name} Videos`}
                     />
                     <div className="absolute z-[2] inset-0 bg-black opacity-70 group-hover:opacity-60 group-active:opacity-40" />
                     <div className='flex flex-col items-center gap-[0.4375rem] relative z-[3]'>
                        <VideoIcon />
                        <span>{data.video_count}</span>
                     </div>
                  </div>
               </div>
               <div
                  className={`w-[23.125rem] h-[11.5625rem] flex justify-center items-center rounded-[10px] overflow-hidden relative group hover:outline-dotted ${data.backdrop ? 'cursor-pointer' : 'cursor-default pointer-events-none'}`}
               >
                  <img
                     className='w-full h-full absolute object-cover transition-transform duration-300 ease-in-out transform group-hover:scale-110'
                     src={data.backdrop || 'https://craftypixels.com/placeholder-image/370x185/999799/31317d'}
                     alt={`${data.name} Backdrops`}
                  />
                  <div className="absolute z-[2] inset-0 bg-black opacity-70 group-hover:opacity-60 group-active:opacity-40" />
                  <div className='flex flex-col items-center gap-[0.4375rem] relative z-[3]'>
                     <BackdropIcon />
                     <span>{data.backdrop_count}</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ShowCollage
