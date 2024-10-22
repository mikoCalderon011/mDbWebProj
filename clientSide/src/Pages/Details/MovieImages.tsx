import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import { useParams } from 'react-router-dom'
import { appendImagesApi, imagesApi, languages } from '../../api/api';
import Section from '../../components/Details/Section';
import Medias from '../../components/Details/Medias';
import Footer from '../../components/Footer/Footer';

const MovieImages = () => {
  const params = useParams();
  const [medias, setMedias] = useState();

  useEffect(() => {
    const fetchMediaData = async () => {
      try {
        const movieId = params.movieId.split('-')[0];
        let response; // Top Level API
        let responseTwo; // Image API
        let responseThree; // Language API

        if (['backdrops', 'posters', 'logos'].includes(params.mediaType)) {
          [response, responseTwo, responseThree] = await Promise.all([
            appendImagesApi('movie', movieId),
            imagesApi('movie', movieId),
            languages()
          ]);

          const languageMap = responseThree.reduce((acc, lang) => {
            acc[lang.iso_639_1] = lang.english_name || lang.name;
            return acc;
          }, {});

          const groupedImagesByLang = responseTwo[params.mediaType].reduce((acc, lang) => {
            const langKey = languageMap[lang.iso_639_1] || lang.iso_639_1 || 'No Language'; 
            if (!acc[langKey]) {
              acc[langKey] = [];
            }
            acc[langKey].push(lang);
            return acc;
          }, {});

          setMedias({
            id: response.id,
            section: {
              section_title: params.mediaType.charAt(0).toUpperCase() + params.mediaType.slice(1),
              backdrop_path: response.backdrop_path,
              title: response.title || null,
              release_date: response.release_date.split('-')[0],
            },
            media: groupedImagesByLang
          });
        }
      }
      catch (error) {
        console.error("Error fetching media data:", error);
      }
    };

    fetchMediaData();
  }, [params]);

  if (medias) {
    return (
      <>
        <main className='text-white flex flex-col gap-0 font-roboto p-0'>
          <Section data={medias.section} />
          <Medias data={medias.media} />
        </main>
      </>
    )
  }
}

export default MovieImages
