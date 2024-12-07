import React from 'react'

const TranslatedTitle = ({ primaryDetails, setPrimaryDetails }) => {
  const handleChange = (e) => {
    setPrimaryDetails({ ...primaryDetails, title: e.target.value })
  }

  return (
    <div className='translated-title--container'>
      <label htmlFor="title" className='text-[.875rem] font-bold'>
        Translated Title (English)
      </label>
      <div className='input--container'>
        <div className='input--wrapper'>
          <input
            id="title"
            name="title"
            placeholder="Enter the translated name of the movie..."
            type="text"
            value={primaryDetails.title}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  )
}

export default TranslatedTitle
