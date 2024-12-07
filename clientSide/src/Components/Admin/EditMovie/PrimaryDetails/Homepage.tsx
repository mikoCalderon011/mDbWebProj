import React from 'react'

const Homepage = ({ primaryDetails, setPrimaryDetails }) => {
  const handleChange = (e) => {
    setPrimaryDetails({ ...primaryDetails, homepage: e.target.value })
  }

  return (
    <div className='homepage--container'>
      <label htmlFor="homepage">
        Homepage 
      </label>
      <div className='input--container'>
        <div className='input--wrapper'>
          <input
            id="homepage"
            className='input'
            name="homepage"
            placeholder="Enter movie's webpage..."
            type="url"
            pattern="https?://.+"
            value={primaryDetails.homepage}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  )
}

export default Homepage