import React from 'react'

const Keywords = () => {
  return (
    <div className='text-white font-roboto flex flex-col gap-[0.875rem]'>
      <span className='text-[#ff8731] font-bold text-[.75rem]'>KEYWORDS</span>
      <div className="w-[16.875rem] h-[2.5rem] border-2 border-white rounded-md flex items-center px-3 hover:border-[#ff8731] focus-within:border-[#ff8731] transition duration-300 ease-in-out">
      <input
            type="text"
            className="w-full h-full text-[.75rem] bg-transparent text-white placeholder-gray-500 focus:outline-none"
            // onBlur={(e) => handleRuntimeChange(e, 'gteRuntime')}
          />
      </div>
    </div>
  )
}

export default Keywords
