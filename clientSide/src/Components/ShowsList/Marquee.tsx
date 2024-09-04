import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { apiFetch } from '../../api/api';

const imageURL = 'https://image.tmdb.org/t/p/w500'

const marquee = {
   initial: {
      x: "0%"
   },
   animate: {
      x: "-100%",
      transition: {
         duration: 40,
         ease: "linear",
         repeat: Infinity,
      }
   }
}

const Marquee = ({ display }) => {
   const [marqueeSlide, setMarqueeSlide] = useState([]);

   useEffect(() => {
      const fetchMovieBackdropPoster = async () => {
         try {
            const data = await apiFetch('/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc');

            const topTen = data.results.slice(0, 5);
            setMarqueeSlide(topTen);
         }
         catch (error) {
            console.log('Error during fetching of data', error);
         }
      }

      fetchMovieBackdropPoster();
   }, []);

   return (
      <section className='w-[66.5625rem] h-[6.125rem] overflow-hidden relative border-t-[1px] border-b-[1px]'>
         <div className='absolute inset-0 z-20' style={{
            background: 'linear-gradient(90deg, rgba(17,17,17,1) 0%, rgba(35,29,24,0) 25%, rgba(30,25,22,0) 75%, rgba(17,17,17,1) 100%)'
         }} />
         <div className='font-robotoFlex text-[3.75rem] font-extrabold absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50'>
            {display}<span className='text-[#FF8731]'>!</span>
         </div>
         <motion.div
            className='flex'
            initial="initial"
            animate="animate"
            variants={marquee}
         >
            {marqueeSlide.map((data, index) => {
               return (
                  <div className='h-full min-w-[22.1875rem] brightness-50' key={index}>
                     <img className='h-full w-full object-cover translate-y-[-3rem]' src={`${imageURL}${data.backdrop_path}`} alt={data.original_title} />
                  </div>
               )
            })}
         </motion.div>
         <motion.div
            className='flex'
            initial="initial"
            animate="animate"
            variants={marquee}
         >
            {marqueeSlide.map((data, index) => {
               return (
                  <div className='h-full min-w-[22.1875rem] brightness-50' key={index}>
                     <img className='h-full w-full object-cover translate-y-[-3rem] ' src={`${imageURL}${data.backdrop_path}`} alt={data.original_title} />
                  </div>
               )
            })}
         </motion.div>
      </section>
   )
}

export default Marquee
