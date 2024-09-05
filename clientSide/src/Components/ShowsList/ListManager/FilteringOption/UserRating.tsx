import React, { useState } from 'react'

const UserRating = ({ selectedUserScore, onUserScoreChange }) => {
   const [userScore, setUserScore] = useState({
      minScore: selectedUserScore.minScore,
      maxScore: selectedUserScore.maxScore
   })

   const handleUserScoreChange = (e, type) => {
      const inputValue = e.target.value;
      const parsedValue = parseInt(inputValue, 10);
      const validValue = !isNaN(parsedValue) ? parsedValue : (type === 'minScore' ? 0 : 10);

      setUserScore(prevState => ({
         ...prevState,
         [type]: validValue
      }));
      onUserScoreChange({
         ...userScore,
         [type]: validValue
      });
   };

   return (
      <div className='text-white font-roboto flex flex-col gap-[0.875rem]'>
         <span className='text-[#ff8731] font-bold text-[.75rem]'>USER RATING</span>
         <div className='flex items-center gap-[.6rem]'>
            <div className="w-[16.875rem] h-[2.5rem] border-2 border-white rounded-md flex items-center px-3 hover:border-[#ff8731] focus-within:border-[#ff8731] transition duration-300 ease-in-out">
               <input
                  type="number"
                  min="0"
                  max="10"
                  placeholder="0"
                  className="w-full h-full text-[.75rem] bg-transparent text-white placeholder-gray-500 focus:outline-none"
                  onChange={(e) => handleUserScoreChange(e, 'minScore')}
               />
            </div>
            <span className='text-[.75rem]'>to</span>
            <div className="w-[16.875rem] h-[2.5rem] border-2 border-white rounded-md flex items-center px-3 hover:border-[#ff8731] focus-within:border-[#ff8731] transition duration-300 ease-in-out">
               <input
                  type="number"
                  min="0"
                  max="10"
                  placeholder="10"
                  className="w-full h-full text-[.75rem] bg-transparent text-white placeholder-gray-500 focus:outline-none"
                  onChange={(e) => handleUserScoreChange(e, 'maxScore')}
               />
            </div>
         </div>
      </div>
   )
}

export default UserRating
