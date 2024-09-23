import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import Marquee from '../../components/ShowsList/Marquee'
import { peopleList } from '../../api/api';
import _ from 'lodash'
import GridView from '../../components/ShowsList/ListManager/ViewDisplay/GridView';
import Footer from '../../components/Footer/Footer';

const PeopleList = () => {
   const [people, setPeople] = useState();
   const [currentPage, setCurrentPage] = useState(1)

   useEffect(() => {
      const fetchPeopleList = async () => {
         try {
            const data = await peopleList(currentPage);
            setPeople(prevPeople => {
               if (currentPage === 1) {
                  return data.results
               }
               else {
                  const existingPeopleIds = new Set(prevPeople.map(person => person.id));
                  const newPeople = data.results.filter(person => !existingPeopleIds.has(person.id));
                  return [...prevPeople, ...newPeople];
               }
            });
         }
         catch (error) {
            console.log('Encounted an error while fetching movie data', error)
         }
      }

      fetchPeopleList();

      const handleScroll = _.debounce(() => {
         const scrollPosition = window.innerHeight + window.scrollY;
         const documentHeight = document.body.offsetHeight;

         if (scrollPosition >= documentHeight) {
            setCurrentPage(prevPage => prevPage + 1);  // Increase page number
         }
      }, 500);

      window.addEventListener('scroll', handleScroll);

      return () => {
         window.removeEventListener('scroll', handleScroll);
      };
   }, [currentPage]);

   console.log(people)

   return (
      <>
         <Header />
         <main className='text-white flex flex-col font-roboto'>
            <Marquee display={"people"} />
            <div className='w-[66.5625rem] flex justify-between'>
               <GridView people={people} />
            </div>
         </main>
         <Footer />
      </>
   )
}

export default PeopleList
