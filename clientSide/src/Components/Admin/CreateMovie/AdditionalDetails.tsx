import React from 'react'

const AdditionalDetails = ({ movieDetails, dispatch }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: 'SET_MOVIE_DETAILS',
      payload: {
        [name]: value === "true" ? true : value === "false" ? false : value,
      },
    });
  };

  return (
    <div className='additional-details'>
      <span className='additional-details--heading'>Additional Details</span>
      <div className='additional-details--section'>
        <label htmlFor="adult" className='additional-details--section--label'>
          Adult Movie?
        </label>
        <div className='input--container'>
          <div className='input--wrapper'>
            <select
              id='adult'
              className='input'
              name='adult'
              value={movieDetails.adult}
              onChange={handleChange}
            >
              <option className='text-white bg-[#111111]' value="true">Yes</option>
              <option className='text-white bg-[#111111]' value="false">No</option>
            </select>
          </div>
        </div>
      </div>
      <div className='additional-details--section'>
        <label htmlFor="video" className='additional-details--section--label'>
          Video?
        </label>
        <div className='input--container'>
          <div className='input--wrapper'>
            <select
              id='video'
              className='input'
              name='video'
              value={movieDetails.video}
              onChange={handleChange}
            >
              <option className='text-white bg-[#111111]' value="true">Yes</option>
              <option className='text-white bg-[#111111]' value="false">No</option>
            </select>
          </div>
        </div>
      </div>
      <div className='additional-details--section'>
        <label htmlFor="tagline" className='additional-details--section--label'>
          Tagline <span className='text-[#939393] text-[1rem]'>(English)</span>
        </label>
        <div className='input--container'>
          <div className='input--wrapper'>
            <input
              id="tagline"
              className='input'
              name="tagline"
              placeholder="Enter movie's tagline..."
              type="text"
              onChange={handleChange}
              value={movieDetails.tagline}
            />
          </div>
        </div>
      </div>
      <div className='additional-details--section'>
        <label htmlFor="runtime" className='additional-details--section--label'>
          Runtime <span className='text-[#939393] text-[1rem]'>(English)</span>
        </label>
        <div className='input--container'>
          <div className='input--wrapper'>
            <input
              id="runtime"
              className='input'
              name="runtime"
              placeholder="Enter movie's runtime..."
              type="number"
              onChange={handleChange}
              value={movieDetails.runtime}
              required
            />
          </div>
        </div>
      </div>
      <div className='additional-details--section'>
        <label htmlFor="budget" className='additional-details--section--label'>
          Budget <span className='text-[#939393] text-[1rem]'>(in U.S dollars)</span>
        </label>
        <div className='input--container'>
          <div className='input--wrapper'>
            <input
              id="budget"
              className='input'
              name="budget"
              placeholder="Enter movie's budget..."
              type="number"
              onChange={handleChange}
              value={movieDetails.budget}
            />
          </div>
        </div>
      </div>
      <div className='additional-details--section'>
        <label htmlFor="revenue" className='additional-details--section--label'>
          Revenue <span className='text-[#939393] text-[1rem]'>(in U.S dollars)</span>
        </label>
        <div className='input--container'>
          <div className='input--wrapper'>
            <input
              id="revenue"
              className='input'
              name="revenue"
              placeholder="Enter movie's revenue..."
              type="number"
              onChange={handleChange}
              value={movieDetails.revenue}
            />
          </div>
        </div>
      </div>
      <div className='additional-details--section'>
        <label htmlFor="webpage" className='additional-details--section--label'>
          Webpage <span className='text-[#939393] text-[1rem]'>(http://www.domain.com/)</span>
        </label>
        <div className='input--container'>
          <div className='input--wrapper'>
            <input
              id="webpage"
              className='input'
              name="webpage"
              placeholder="Enter movie's webpage..."
              type="url"
              onChange={handleChange}
              value={movieDetails.webpage}
              pattern="https?://.+"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdditionalDetails
