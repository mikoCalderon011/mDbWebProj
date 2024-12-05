import React, { useState } from 'react'
import AddIconSmall from '../../../assets/Icons/Admin/AddIconSmall'
import ImageUploadModal from '../Modals/ImageUploadModal';
import { addBackdrop, addLogo, addPoster } from '../../../api/api';
import { useParams } from 'react-router-dom';

const Images = ({ movieData, setMovieData }) => {
  const images = movieData?.images;
  const [selectedImageType, setSelectedImageType] = useState('poster');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const mediaDimensions = {
    logo: {
      width: 'w-[23.4375rem]',
      height: 'h-[13.5rem]',
    },
    poster: {
      width: 'w-[14.875rem]',
      height: 'h-[22.75rem]',
    },
    backdrop: {
      width: 'w-[23.4375rem]',
      height: 'h-[13.5rem]',
    }
  }

  const { movieId } = useParams();

  const handleImageUpload = async (file, type) => {
    try {
      const formData = new FormData();
      formData.append(type, file);

      let response;
      switch (type) {
        case 'poster':
          response = await addPoster(movieId, formData);
          break;
        case 'backdrop':
          response = await addBackdrop(movieId, formData);
          break;
        case 'logo':
          response = await addLogo(movieId, formData);
          break;
        default:
          throw new Error('Invalid image type');
      }

      if (response && response[selectedImageType]) {
        const newImage = response[selectedImageType];; // Adjust this based on your response structure

        // Add the new image to the movieData
        setMovieData((prevMovieData) => {
          const updatedImages = {
            ...prevMovieData.images,
            [selectedImageType + 's']: [...prevMovieData.images[selectedImageType + 's'], newImage],
          };

          return {
            ...prevMovieData,
            images: updatedImages,
          };
        });

        alert(`${selectedImageType.charAt(0).toUpperCase() + selectedImageType.slice(1).toLowerCase()} has been added successfully!`);
      }
    }
    catch (error) {
      alert(`Error occurred while adding ${selectedImageType}`);
      console.error(`Error occurred while adding ${selectedImageType}`, error);
    }
  };


  const handleImageTypeChange = (e) => {
    setSelectedImageType(e.target.value);
  }

  const filteredImages = images?.[selectedImageType + 's'] || [];

  console.log(filteredImages)

  return (
    <>
      <div className='w-[66.1875rem] h-full relative flex gap-[1.5625rem] pb-[1.375rem]'>
        <div className='flex flex-col gap-[1.875rem]'>
          <div className='w-[16.6875rem] h-[2rem] flex items-center justify-center border-solid border-[1px] border-[#1A1A1A] rounded-[.5rem]'>
            <div className='w-[15.5rem]'>
              <select
                className='w-full h-full bg-transparent text-white border-none outline-none'
                name="images"
                id="images"
                onChange={handleImageTypeChange}
              >
                <option value={'poster'} className='text-white bg-[#111111]'>Posters</option>
                <option value={'backdrop'} className='text-white bg-[#111111]'>Backdrops</option>
                <option value={'logo'} className='text-white bg-[#111111]'>Logos</option>
              </select>
            </div>
          </div>
          <div className='w-[16.6875rem] flex flex-col items-center justify-center border-solid border-[1px] border-[#1A1A1A] rounded-[.5rem]'>
            <div className='w-[13.25rem] flex justify-end pt-[1.375rem]'>
              <button
                className='w-[1.6875rem] h-[1.6875rem] flex items-center justify-center border-solid border-[1px] border-white rounded-full'
                onClick={() => setIsModalOpen(true)}
              >
                <AddIconSmall />
              </button>
            </div>
            <div className='w-[13.25rem] flex justify-end pb-[1.375rem]'>
                To be added
            </div>
          </div>
        </div>
        <div className='w-[47.9375rem] h-[20rem] flex flex-wrap gap-[1.0625rem]'>
          {filteredImages.length > 0 ? filteredImages.map((image, index) => (
            <img
              src={`http://localhost:3000/images/${image.file_path}`}
              key={index}
              alt={`${selectedImageType} ${index + 1}`}
              className={`${mediaDimensions[selectedImageType].width} ${mediaDimensions[selectedImageType].height} object-cover`}
            />
          )) : `No ${selectedImageType}s has been added. Start adding now!`}
        </div>
        <ImageUploadModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          selectedImageType={selectedImageType}
          onImageUpload={handleImageUpload}
        />
      </div>
    </>
  )
}

export default Images
