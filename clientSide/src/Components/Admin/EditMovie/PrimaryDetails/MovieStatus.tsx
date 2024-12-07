import React from 'react'

const MovieStatus = ({ primaryDetails, setPrimaryDetails }) => {
  const handleChange = (e) => {
    setPrimaryDetails({ ...primaryDetails, status: e.target.value })
  }

  return (
    <div className="movie-status--container">
      <label htmlFor="movie_status">
        Status
      </label>
      <div className="select--wrapper">
        <select
          id="movie_status"
          className="select"
          value={primaryDetails.status}
          onChange={handleChange}
        >
          <option
            value="Released"
          >
            Released
          </option>
          <option
            value="Rumored"
          >
            Rumored
          </option>
          <option
            value="Planned"
          >
            Planned
          </option>
          <option
            value="In Production"
          >
            In Production
          </option>
          <option
            value="Cancelled"
          >
            Cancelled
          </option>
        </select>
      </div>
    </div>
  )
}

export default MovieStatus