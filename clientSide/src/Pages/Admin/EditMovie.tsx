import React, { useState } from 'react';
import { useHorizontalScroll } from '../../hooks/useHorizontalScroll';
import PrimaryDetails from '../../components/Admin/EditMovie/PrimaryDetails';
import AlternativeTitles from '../../components/Admin/EditMovie/AlternativeTitles';
import Cast from '../../components/Admin/EditMovie/Cast';
import Crew from '../../components/Admin/EditMovie/Crew';
import ExternalIds from '../../components/Admin/EditMovie/ExternalIds';
import Genres from '../../components/Admin/EditMovie/Genres';
import Keywords from '../../components/Admin/EditMovie/Keywords';
import ProductionInformation from '../../components/Admin/EditMovie/ProductionInformation';
import ReleaseInformation from '../../components/Admin/EditMovie/ReleaseInformation';
import Taglines from '../../components/Admin/EditMovie/Taglines';
import Videos from '../../components/Admin/EditMovie/Videos';

const EditMovie = () => {
   const scrollRef = useHorizontalScroll();
   const [selectedTab, setSelectedTab] = useState('Primary Details');
   const [activeIndex, setActiveIndex] = useState(0); // To manage animation direction
   
   const tabContent = [
      { name: 'Primary Details', component: <PrimaryDetails /> },
      { name: 'Alternative Titles', component: <AlternativeTitles /> },
      { name: 'Cast', component: <Cast /> },
      { name: 'Crew', component: <Crew /> },
      { name: 'External Ids', component: <ExternalIds /> },
      { name: 'Genres', component: <Genres /> },
      { name: 'Keywords', component: <Keywords /> },
      { name: 'Production Information', component: <ProductionInformation /> },
      { name: 'Release Information', component: <ReleaseInformation /> },
      { name: 'Taglines', component: <Taglines /> },
      { name: 'Videos', component: <Videos /> },
   ];

   const handleTabClick = (tab, index) => {
      setActiveIndex(index);
      setSelectedTab(tab.name);
   };

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
               {tabContent.map((tab, index) => (
                  <div
                     key={tab.name}
                     className={`h-full flex items-center justify-center px-[1.75rem] rounded-full cursor-pointer ${
                        selectedTab === tab.name ? 'bg-[#CC511D] text-white' : 'bg-transparent text-white'
                     }`}
                     onClick={() => handleTabClick(tab, index)}
                  >
                     <span>{tab.name}</span>
                  </div>
               ))}
            </div>
         </div>
         <div className="h-full relative mt-4 overflow-hidden">
            <div
               className="transition-transform duration-500 flex"
               style={{
                  transform: `translateX(-${activeIndex * 100}%)`,
               }}
            >
               {tabContent.map((tab) => (
                  <div key={tab.name} className="w-full min-w-full">
                     {tab.component}
                  </div>
               ))}
            </div>
         </div>
      </div>
   );
};

export default EditMovie;
