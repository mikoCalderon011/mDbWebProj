import React, { useState } from 'react'

const Runtime = ({ selectedRuntime, onRuntimeChange }) => {
  const [runtime, setRuntime] = useState({
    gteRuntime: selectedRuntime.gteRuntime,
    lteRuntime: selectedRuntime.lteRuntime
  });

  const handleRuntimeChange = (e, type) => {
    const inputValue = e.target.value;
    const parsedValue = parseInt(inputValue, 10);
  
    setRuntime(prevState => ({
      ...prevState,
      [type]: parsedValue
    }));
  
    onRuntimeChange ({
      ...runtime,
      [type]: parsedValue
    });
  };

  return (
    <div className='text-white font-roboto flex flex-col gap-[0.875rem]'>
      <span className='text-[#ff8731] font-bold text-[.75rem]'>RUNTIME</span>
      <div className='flex items-center gap-[.6rem]'>
        <div className="w-[16.875rem] h-[2.5rem] border-2 border-white rounded-md flex items-center px-3 hover:border-[#ff8731] focus-within:border-[#ff8731] transition duration-300 ease-in-out">
          <input
            type="number"
            className="w-full h-full text-[.75rem] bg-transparent text-white placeholder-gray-500 focus:outline-none"
            onBlur={(e) => handleRuntimeChange(e, 'gteRuntime')}
          />
        </div>
        <span className='text-[.75rem]'>to</span>
        <div className="w-[16.875rem] h-[2.5rem] border-2 border-white rounded-md flex items-center px-3 hover:border-[#ff8731] focus-within:border-[#ff8731] transition duration-300 ease-in-out">
          <input
            type="number"
            className="w-full h-full text-[.75rem] bg-transparent text-white placeholder-gray-500 focus:outline-none"
            onBlur={(e) => handleRuntimeChange(e, 'lteRuntime')}
          />
        </div>
      </div>
    </div>
  )
}

export default Runtime
