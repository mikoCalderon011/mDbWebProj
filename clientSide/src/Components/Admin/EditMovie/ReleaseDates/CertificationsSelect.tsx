import React, { useEffect, useState } from 'react'
import { certificationList } from '../../../../api/api';

const CertificationsSelect = ({ releaseDate, setReleaseDate }) => {
   const [selectedCertifications, setSelectedCertifications] = useState([])

   useEffect(() => {
      const fetchCertification = async () => {
         try {
            const response = await certificationList('movie');

            console.log(response);

            if (releaseDate.country) {
               // Assuming the country code is in uppercase
               const countryCode = releaseDate.country.iso_3166_1.toUpperCase();

               // Filter certifications for the specific country
               const countryCertifications = response[countryCode] || [];

               setSelectedCertifications(countryCertifications);
            }

         }
         catch (error) {
            console.log("An error occured during the process", error)
         }
      }

      fetchCertification();
   }, [releaseDate.country])

   const handleChange = (e) => {
      setReleaseDate({ ...releaseDate, certification: e.target.value });
   }

   return (
      <div className="certifications-select--container">
         <label for="type">Type</label>
         <div className='select--container'>
            <div className='select--wrapper'>
               <select
                  name='type'
                  onChange={handleChange}
               >
                  <option value="">Select Certification</option>
                  {selectedCertifications.map((cert, index) => (
                     <option
                        key={index}
                        value={cert.certification}
                     >
                        {cert.certification} - {cert.meaning}
                     </option>
                  ))}
               </select>
            </div>
         </div>
      </div>
   )
}

export default CertificationsSelect
