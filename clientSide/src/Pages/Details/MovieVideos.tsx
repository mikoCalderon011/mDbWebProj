import React, { useEffect, useState } from 'react'
import Header from '../../components/Header/Header'
import { useParams } from 'react-router-dom';
import { appendVideosApi, fetchMultipleVideosData, fetchYoutubeData } from '../../api/api';
import Section from '../../components/Details/Section';
import Videos from '../../components/Details/Videos';
import Footer from '../../components/Footer/Footer';

const MovieVideos = () => {
  const params = useParams();
  const [videos, setVideos] = useState();

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const movieId = params.movieId.split('-')[0];
        const response = await appendVideosApi('movie', movieId);

        // This code maps through the response data and fetches additional details from the YouTube API for each video, merging that information into the existing video data structure.

        const videoKeys = response.videos.results.map(video => video.key);
        const youtubeDataArray = await fetchMultipleVideosData(videoKeys);
        const youtubeDataMap = youtubeDataArray.reduce((acc, youtubeData) => {
          acc[youtubeData.id] = youtubeData;
          return acc;
        }, {});

        const videoTypeGroup = response.videos.results.reduce((acc, video) => {
          if (!acc[video.type]) acc[video.type] = [];

          acc[video.type].push({ ...video, youtubeData: youtubeDataMap[video.key] });
          return acc;
        }, {});

        console.log(videoTypeGroup)

        setVideos({
          id: response.id,
          section: {
            section_title: 'Videos',
            backdrop_path: response.backdrop_path,
            title: response.title || null,
            release_date: response.release_date.split('-')[0],
          },
          videos: videoTypeGroup
        })
      }
      catch (error) {
        console.error("Error fetching media data:", error);
      }
    }

    fetchVideoData();
  }, [params])

  if (videos) {
    return (
      <>
        <Header />
        <main className='text-white flex flex-col gap-0 font-roboto p-0'>
          <Section data={videos.section} />
          <Videos data={videos.videos} />
        </main>
        <Footer />
      </>
    )
  }
}

export default MovieVideos
