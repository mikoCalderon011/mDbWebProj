import React, { useState } from 'react';
import JobSearch from './JobSearch';

const JobSearchBar = ({ jobOccupation, setJobOccupation }) => {
   const [results, setResults] = useState([]);

   const handleSelectJobOccupation = (job, department) => {
      setJobOccupation({
         job: job,
         department: department
      });
      setResults([]); 
   };

   return (
      <div className="job-search-bar">
         <label className="label">Job Name</label>
         <div>
            <JobSearch 
               setResults={setResults}
               jobOccupation={jobOccupation}
               setJobOccupation={setJobOccupation}
            />
         </div>
         {results && results.length > 0 && (
            <div className="job-search-results">
               {results.map((result, index) => (
                  <div key={index} className="result-item">
                     {result.jobs.map((job, jobIndex) => (
                        <div
                           key={`${index}-${jobIndex}`}
                           className="job-item"
                           onClick={() => handleSelectJobOccupation(job, result.department)} 
                        >
                           <div className="job-name">Job: {job}</div>
                           <div className="department-name">Department: {result.department}</div>
                        </div>
                     ))}
                  </div>
               ))}
            </div>
         )}
      </div>
   );
};

export default JobSearchBar;
