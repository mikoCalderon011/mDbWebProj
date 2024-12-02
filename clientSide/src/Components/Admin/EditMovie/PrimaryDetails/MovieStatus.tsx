import React from 'react'

const MovieStatus = () => {
  return (
    <div className="w-[25.5rem] flex flex-col gap-[0.5625rem] font-roboto">
      <label htmlFor="original_language" className="text-[.875rem] font-bold">
        Status
      </label>
      <div className="w-full h-[2.3125rem] flex justify-center items-center bg-transparent border-solid border-[1px] border-white rounded-sm">
        <select
          id="original_language"
          className="w-full h-full bg-transparent text-[.875rem] border-none outline-none px-2 bg-black text-white border-[1px] border-[#CC511D] rounded-sm"
        >
          <option
            className='bg-black text-white border-solid border-[1px] border-[#CC511D] rounded-sm'
            value="Released"
          >
            Released
          </option>
          <option
            className='bg-black text-white border-solid border-[1px] border-[#CC511D] rounded-sm'
            value="Rumored"
          >
            Rumored
          </option>
          <option
            className='bg-black text-white border-solid border-[1px] border-[#CC511D] rounded-sm'
            value="Planned"
          >
            Planned
          </option>
          <option
            className='bg-black text-white border-solid border-[1px] border-[#CC511D] rounded-sm'
            value="In Production"
          >
            In Production
          </option>
          <option
            className='bg-black text-white border-solid border-[1px] border-[#CC511D] rounded-sm'
            value="Released"
          >
            Released
          </option>
          <option
            className='bg-black text-white border-solid border-[1px] border-[#CC511D] rounded-sm'
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
