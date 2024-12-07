import React from 'react'

const TranslatedOverview = ({ primaryDetails, setPrimaryDetails }) => {
  const handleChange = (e) => {
    setPrimaryDetails({ ...primaryDetails, overview: e.target.value })
  }

  return (
    <div className="translated-overview--container">
      <label htmlFor="overview">
        Translated Overview (English)
      </label>
      <div className="textarea--container">
        <div className='textarea--wrapper'>
          <textarea
            id="overview"
            name="overview"
            placeholder="Enter movie overview..."
            minLength={10}
            value={primaryDetails.overview}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  )
}

export default TranslatedOverview
