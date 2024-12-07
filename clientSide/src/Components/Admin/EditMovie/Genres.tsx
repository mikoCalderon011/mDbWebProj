import React, { useState } from 'react'
import AddIcon from '../../../assets/Icons/Admin/AddIcon'
import AddGenreModal from '../Modals/AddGenreModal';
import { addGenre, deleteGenre } from '../../../api/api';
import { useParams } from 'react-router-dom';
import DeleteIconWhite from '../../../assets/Icons/Admin/DeleteIconWhite';

const Genres = ({ movieData, setMovieData }) => {
  const genreData = movieData.genres;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [genre, setGenre] = useState('Action');

  const toggleAddGenreModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const { movieId } = useParams();

  const handleAddGenre = async () => {
    try {
      const isDuplicate = movieData.genres.some((g) => g.name === genre);
      if (isDuplicate) {
        alert('This genre already exists.');
        return;
      }

      const newGenre = { id: Date.now(), name: genre };
      await addGenre(movieId, { genre: genre })

      setMovieData((prevData) => ({
        ...prevData,
        genres: [...prevData.genres, newGenre]
      }));

      alert(`Genre has been added successfully!`);
    }
    catch (error) {
      alert(`Adding genre failed`);
      console.error(`Error occured during the process`, error);
    }
  }

  const handleDeleteGenre = async (selectedGenre) => {
    const confirmDeletion = window.confirm(`Are you sure you want to remove the genre "${selectedGenre}"?`);

    if (confirmDeletion) {
      try {
        console.log(selectedGenre)
        await deleteGenre(movieId, selectedGenre);

        setMovieData((prevData) => ({
          ...prevData,
          genres: prevData.genres.filter((genre) => genre.name !== selectedGenre), // Filter out the deleted genre
        }));

        alert(`Genre "${selectedGenre}" has been removed successfully!`);
      }
      catch (error) {
        alert(`Deleting genre failed`);
        console.error(`Error occurred during the process`, error);
      }
    }
  }

  return (
    <div className="genres">
      <div className="genres-header">
        <button
          onClick={toggleAddGenreModal}
          className="add-genre-button"
        >
          <AddIcon />
          <span>Add Genre</span>
        </button>
      </div>
      <div className="genres-table">
        <table>
          <thead>
            <tr>
              <th>Genres</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {genreData?.map((genre) => (
              <tr
                key={`${genre.id}-${genre.name}`}
              >
                <td>{genre.name}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteGenre(genre.name)}
                  >
                    <DeleteIconWhite />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AddGenreModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        genre={genre}
        setGenre={setGenre}
        onSave={handleAddGenre}
      />
    </div>
  )
}

export default Genres
