import React from 'react';

const AddMovieDetails = ({ movieDetails, dispatch }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: 'SET_MOVIE_DETAILS',
      payload: { [name]: value },
    });
  };

  return (
    <div className='add-movie-details'>
      <span className='add-movie-details--heading'>Add Movie Details</span>
      <div className='add-movie-details--section'>
        <label htmlFor="original_title" className='add-movie-details--section--label'>
          Original Name <span className='required'> *</span>
        </label>
        <div className='input--container'>
          <div className='input--wrapper'>
            <input
              id="original_title"
              className='input'
              name="original_title"
              placeholder="Enter the original name of the movie..."
              type="text"
              onChange={handleChange}
              value={movieDetails.original_title}
            />
          </div>
        </div>
      </div>
      <div className="add-movie-details--section">
        <label htmlFor="overview" className="add-movie-details--section--label">
          Movie Overview (English)
          <span className="required"> * </span>
          <span className="info">(minimum of 10 characters)</span>
        </label>
        <div className="textarea--container">
          <div className='textarea--wrapper'>
            <textarea
              id="overview"
              className="textarea"
              name="overview"
              placeholder="Enter movie overview..."
              minLength={10}
              value={movieDetails.overview}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
      <div className='add-movie-details--section'>
        <label htmlFor="imdb_id" className='add-movie-details--section--label'>
          IMDB ID (tt17382524) 
          <span className='info'> Optional</span>
        </label>
        <div className='input--container'>
          <div className='input--wrapper'>
            <input
              id="imdb_id"
              className='input'
              name="imdb_id"
              placeholder="Enter imdb id..."
              type="text"
              value={movieDetails.imdb_id}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMovieDetails;
