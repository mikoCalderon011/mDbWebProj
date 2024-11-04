const axios = require('axios');

const youtubeAPI = axios.create({
   baseURL: 'https://www.googleapis.com/youtube/v3/',
   headers: {
      'Content-Type': 'application/json',
   },
});

exports.get_video_details = async (videoId) => {
   try {
      const response = await youtubeAPI.get('videos', {
         params: {
            id: videoId,
            part: 'snippet,contentDetails',
            key: process.env.YOUTUBE_API_KEY,
         },
      });

      if (response.data.pageInfo.totalResults === 0) {
         throw new Error("Video not found or API key is invalid");
      }

      return response.data;
   } catch (error) {
      if (error.response) {
         if (error.response.status === 403) {
            console.error('API key is invalid or quota exceeded');
            throw new Error("API key is invalid or quota exceeded");
         } 
         else if (error.response.status === 400) {
            console.error('Bad request, possibly invalid video ID or parameters');
            throw new Error("Bad request");
         }
      }
      console.error('Error fetching video details:', error);
      throw error;
   }
};