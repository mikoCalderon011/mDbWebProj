import React, { useState } from 'react'
import AddIcon from '../../../assets/Icons/Admin/AddIcon'

const Taglines = ({ movieData, setMovieData }) => {
  const [tagline, setTagline] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(movieData)

  return (
    <div className="relative">
      <div className="flex items-center justify-end mb-4">
        <button
          // onClick={toggleAddGenreModal}
          className="flex items-center justify-center gap-[.5rem] px-4 py-3 bg-[#CC511D] text-white rounded-md hover:bg-[#FF7031] transition duration-200"
        >
          <AddIcon />
          <span className='text-[.75rem] font-semibold'>Add Tagline</span>
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-[#111111] text-white rounded-lg">
          <thead>
            <tr className="flex justify-between border-b border-[#444444]">
              <th className="px-4 py-2 text-left">Taglines</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>

          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Taglines
