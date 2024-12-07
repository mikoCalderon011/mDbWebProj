import React from 'react'

const Video = ({ primaryDetails, setPrimaryDetails }) => {
  const handleChange = (e) => {
    setPrimaryDetails({ ...primaryDetails, video: e.target.value === "true" })
  }

  return (
    <div className="video--container">
      <label htmlFor="video_option">
        Video?
      </label>
      <div className="select--wrapper">
        <select
          id="video_option"
          value={primaryDetails.video ? "true" : "false"}
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

export default Video