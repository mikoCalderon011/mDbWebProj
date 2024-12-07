import React from 'react'

const Revenue = ({ primaryDetails, setPrimaryDetails }) => {
  const handleChange = (e) => {
    setPrimaryDetails({ ...primaryDetails, revenue: e.target.value })
  }

  return (
    <div className='revenue--container'>
      <label htmlFor="revenue" className='text-[.875rem] font-bold'>
        Revenue (in US Dollars)
      </label>
      <div className='input--container'>
        <div className='input--wrapper'>
          <input
            id="revenue"
            name="revenue"
            type="number"
            value={primaryDetails.revenue}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  )
}

export default Revenue
