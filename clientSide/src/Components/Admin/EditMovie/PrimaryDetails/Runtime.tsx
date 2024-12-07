import React from 'react'

const Runtime = ({ primaryDetails, setPrimaryDetails }) => {
  const handleChange = (e) => {
    setPrimaryDetails({ ...primaryDetails, runtime: e.target.value })
  }

  return (
    <div className='runtime--container'>
      <label htmlFor="runtime">
        Runtime (in minutes)
      </label>
      <div className='input--container'>
        <div className='input--wrapper'>
          <input
            id="runtime"
            name="runtime"
            type="number"
            value={primaryDetails.runtime}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  )
}

export default Runtime
