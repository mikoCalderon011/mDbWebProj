import React from 'react'

const Budget = ({ primaryDetails, setPrimaryDetails }) => {
  const handleChange = (e) => {
    setPrimaryDetails({ ...primaryDetails, budget: e.target.value })
  }

  return (
    <div className='budget-container'>
      <label htmlFor="budget">
        Budget (in US Dollars)
      </label>
      <div className='input-container'>
        <div className='input-wrapper'>
          <input
            id="budget"
            className='input'
            name="budget"
            type="number"
            value={primaryDetails.budget}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  )
}

export default Budget
