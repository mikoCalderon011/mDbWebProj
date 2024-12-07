import React from 'react'

const OriginalTitle = ({ primaryDetails, setPrimaryDetails }) => {
  const handleChange = (e) => {
    setPrimaryDetails({ ...primaryDetails, original_title: e.target.value })
  }
  
  return (
    <div className='original-title--container'>
      <label htmlFor="original_title">
        Original Name
      </label>
      <div className='input--container'>
        <div className='input--wrapper'>
          <input
            id="original_title"
            name="original_title"
            className='input'
            placeholder="Enter the original name of the movie..."
            type="text"
            value={primaryDetails.original_title}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  )
}

export default OriginalTitle