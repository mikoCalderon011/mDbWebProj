import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import { useParams } from 'react-router-dom'
import { topLevelDataAppendCreditsApi } from '../../api/api';
import Section from '../../components/Details/Section';

const MovieCredits = () => {
   const params = useParams();
   const [credits, setCredits] = useState();

   useEffect(() => {
      const fetchCreditsData = async () => {
         try {
            const response = await topLevelDataAppendCreditsApi('movie', params.movieId.split('-')[0]);

            console.log(response)

            const groupedCrew = response.credits.crew.reduce((acc, member) => {
               if (!acc[member.known_for_department]) acc[member.known_for_department] = [];

               acc[member.known_for_department].push(member);

               return acc;
            }, {})

            setCredits({
               id: response.id,
               section: {
                  full_cast: 'Full Cast', 
                  crew: 'Crew',
                  backdrop_path: response.backdrop_path || null,  
                  title: response.title || null,  
                  release_date: response.release_date.split('-')[0]
               },
               casts: response.credits.cast || [],
               crews: groupedCrew || [], 
            });
         }
         catch (error) {
            console.error('Error fetching data:', error);
         }
      }

      fetchCreditsData();
   }, [params.movieId])

   console.log(credits)

   if (credits) {
      return (
         <>
            <Header />
            <main className='text-white flex flex-col gap-0 font-roboto p-0'>
               <Section data={credits.section} />
            </main>
         </>
      )
   }
}

export default MovieCredits
