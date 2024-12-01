import React, { useReducer } from 'react';
import langDetect from 'langdetect'
import AddMovieDetails from '../../components/Admin/CreateMovie/AddMovieDetails';
import TranslationCheck from '../../components/Admin/CreateMovie/TranslationCheck';
import TvContentCheck from '../../components/Admin/CreateMovie/TvContentCheck';
import MovieContentCheck from '../../components/Admin/CreateMovie/MovieContentCheck';
import AdditionalDetails from '../../components/Admin/CreateMovie/AdditionalDetails';
import VerifyAndSave from '../../components/Admin/CreateMovie/VerifyAndSave';

const initialState = {
   step: 1,
   movieDetails: {
      original_name: '',
      movie_overview: '',
      imdb_id: '',
   },
   translation: {
      detectedLang: '',  
      isValid: false,    
   },
};

// Correct function declaration for formReducer
const formReducer = (state, action) => {
   switch (action.type) {
      case 'NEXT_STEP':
         return { ...state, step: state.step + 1 };
      case 'PREV_STEP':
         return { ...state, step: state.step - 1 };
      case 'SET_MOVIE_DETAILS':
         return {
            ...state,
            movieDetails: { ...state.movieDetails, ...action.payload },
         };
      default:
         throw new Error(`Unhandled action type: ${action.type}`);
   }
};

const CreateMovie = () => {
   const [state, dispatch] = useReducer(formReducer, initialState);

   const handleNext = () => {
      if (state.step === 1) {
         const detectedLang = langDetect.detectOne(state.movieDetails.movie_overview);

         dispatch({ type: 'SET_TRANSLATION', payload: detectedLang });

         if (detectedLang !== 'en') {
            dispatch({ type: 'SET_TRANSLATION_STATUS', payload: false });
            return; 
         } 
         else {
            dispatch({ type: 'SET_TRANSLATION_STATUS', payload: true });
         }
      }
      dispatch({ type: 'NEXT_STEP' })
   };
   const handlePrev = () => dispatch({ type: 'PREV_STEP' });

   const handleSubmit = () => {
      console.log('Submitting movie details:', state.movieDetails);
   };

   const renderStep = () => {
      switch (state.step) {
         case 1:
            return (
               <AddMovieDetails
                  movieDetails={state.movieDetails}
                  dispatch={dispatch}
               />
            );
         case 2:
            return (
               <TranslationCheck />
            );
         case 3:
            return (
               <TvContentCheck />
            );
         case 4:
            return (
               <MovieContentCheck />
            );
         case 5:
            return (
               <AdditionalDetails />
            );
         case 6:
            return (
               <VerifyAndSave />
            );
         default:
            return <h2>Unknown Step</h2>;
      }
   };

   return (
      <div className='w-[51.6875rem] flex flex-col gap-[1.8125rem]'>
         {renderStep()}
         <div className='w-full flex gap-[.75rem] justify-end'>
            {state.step > 1 && (
               <button
                  className='h-[2.125rem] px-[1.5625rem] bg-[#CC511D] text-[0.875rem] font-bold rounded-[.625rem] self-end'
                  onClick={handlePrev}
               >
                  Back
               </button>
            )}
            {state.step < 6 && (
               <button
                  className='h-[2.125rem] px-[1.5625rem] bg-[#CC511D] text-[0.875rem] font-bold rounded-[.625rem]'
                  onClick={handleNext}
               >
                  Next
               </button>
            )}
            {state.step === 6 && (
               <button
                  className='h-[2.125rem] px-[1.5625rem] bg-[#CC511D] text-[0.875rem] font-bold rounded-[.625rem]'
                  onClick={handleSubmit}
               >
                  Submit
               </button>
            )}
         </div>
      </div>
   );
};

export default CreateMovie;
