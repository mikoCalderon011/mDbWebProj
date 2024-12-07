import React, { useEffect, useState } from 'react';
import { fetchGenreList } from '../../../api/api';

const AddGenreModal = ({ isModalOpen, setIsModalOpen, genre, setGenre, onSave }) => {
   const [genreList, setGenreList] = useState([]);

   useEffect(() => {
      const fetchGenres = async () => {
         try {
            const response = await fetchGenreList();
            setGenreList(response.genres);
         } 
         catch (error) {
            console.log('An error occurred during the process', error);
         }
      };

      fetchGenres();
   }, []);

   return (
      isModalOpen && (
         <div className="edit-movie--modal">
            <div className="edit-movie--modal--container">
               <div className="menu--container">
                  <h2>Add Genre</h2>
                  <button
                     onClick={() => {
                        setIsModalOpen(false);
                     }}
                  >
                     ✕
                  </button>
               </div>
               <div className="genre-modal--container">
                  <div>
                     <label for="type" className="custom-label">Genres</label>
                     <div className='custom-select-container'>
                        <div className='custom-select-wrapper'>
                           <select
                              name='type'
                              className='custom-select'
                              value={genre}
                              onChange={(e) => setGenre(e.target.value)}
                           >
                              {genreList.map((genre) => {
                                 return (
                                    <option className='custom-option' value={genre.name}>{genre.name}</option>
                                 )
                              })}
                           </select>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="flex-end">
                  <button
                     onClick={() => {
                        setIsModalOpen(false);
                     }}
                     className="custom-button cancel-button"
                  >
                     Cancel
                  </button>
                  <button
                     className="custom-button save-button"
                     onClick={onSave}
                  >
                     Save
                  </button>
               </div>
            </div>
         </div>
      )
   );
};

export default AddGenreModal;
