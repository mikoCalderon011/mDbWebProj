import React from 'react'

const AdultMovie = ({ primaryDetails, setPrimaryDetails }) => {
  const handleChange = (e) => {
    setPrimaryDetails({ ...primaryDetails, adult: e.target.value === "true" })
  }

  return (
    <div className="adult-movie-container">
      <label htmlFor="adult_movie">
        Adult Movie?
      </label>
      <div className="select-container">
        <select
          id="adult_movie"
          value={primaryDetails.adult ? "true" : "false"}
          onChange={handleChange}
        >
          <option
            value="false"
          >
            No
          </option>
          <option
            value="true"
          >
            Yes
          </option>
        </select>
      </div>
    </div>
  )
}

export default AdultMovie