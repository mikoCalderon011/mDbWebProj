import React from 'react'
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll';

const EditMovie = () => {
   const scrollRef = useHorizontalScroll();

  return (
    <div className="w-[66.1875rem] flex flex-col gap-[1.25rem]">
      <span className="text-[1.5rem] font-bold">
        Edit Some Movie Title (2024)
      </span>
      <div 
         className="w-[51.6875rem] h-[2.375rem] flex items-center border-solid border-[1px] border-[#CC511D] rounded-full text-[.75rem] overflow-x-auto scrollbar-none"
         ref={scrollRef}
      >
        <div className="flex w-max h-full text-nowrap">
          <div className="h-full flex items-center justify-center px-[1.75rem] rounded-full bg-[#CC511D]">
            <span>Primary Details</span>
          </div>
          <div className="h-full flex items-center justify-center px-[1.75rem] rounded-full bg-[#CC511D]">
            <span>Alternative Titles</span>
          </div>
          <div className="h-full flex items-center justify-center px-[1.75rem] rounded-full bg-[#CC511D]">
            <span>Cast</span>
          </div>
          <div className="h-full flex items-center justify-center px-[1.75rem] rounded-full bg-[#CC511D]">
            <span>Crew</span>
          </div>
          <div className="h-full flex items-center justify-center px-[1.75rem] rounded-full bg-[#CC511D]">
            <span>External Ids</span>
          </div>
          <div className="h-full flex items-center justify-center px-[1.75rem] rounded-full bg-[#CC511D]">
            <span>Genres</span>
          </div>
          <div className="h-full flex items-center justify-center px-[1.75rem] rounded-full bg-[#CC511D]">
            <span>Keywords</span>
          </div>
          <div className="h-full flex items-center justify-center px-[1.75rem] rounded-full bg-[#CC511D]">
            <span>Product Information</span>
          </div>
          <div className="h-full flex items-center justify-center px-[1.75rem] rounded-full bg-[#CC511D]">
            <span>Release Information</span>
          </div>
          <div className="h-full flex items-center justify-center px-[1.75rem] rounded-full bg-[#CC511D]">
            <span>Taglines</span>
          </div>
          <div className="h-full flex items-center justify-center px-[1.75rem] rounded-full bg-[#CC511D]">
            <span>Videos</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMovie;
