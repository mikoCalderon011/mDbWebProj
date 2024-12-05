import axios from 'axios'

const apiClient = axios.create({
   baseURL: 'https://api.themoviedb.org/3',
   headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_TMDB_API_READ_ACCESS_KEY}`
   },
})

const youtubeApi = axios.create({
   baseURL: 'https://www.googleapis.com/youtube/v3/videos',
});

export const apiFetch = async (endpoint) => {
   try {
      const response = await apiClient({
         url: endpoint
      })

      return response.data;
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

export const countryListApi = async () => {
   try {
      const response = await apiClient({
         url: "https://api.themoviedb.org/3/watch/providers/regions?language=en-US"
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

export const watchProviderApi = async (type, code) => {
   console.log(`https://api.themoviedb.org/3/watch/providers/${type}?language=en-US&watch_region=${code}`)

   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/watch/providers/${type}?language=en-US&watch_region=${code}`
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

// Certification Country
export const certificationList = async (type) => {
   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/certification/${type}/list`
      })

      return response.data.certifications
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

// Original Language
export const originalLanguageList = async () => {
   try {
      const response = await apiClient({
         url: "https://api.themoviedb.org/3/configuration/languages"
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

export const keywordResults = async (query) => {
   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/search/keyword?query=${query}&page=1`
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

export const movieDetailModal = async (type, id) => {
   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/${type}/${id}?append_to_response=videos,credits&language=en-US`
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

export const certificationsDetail = async (type, movieId) => {
   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/${type}/${movieId}/${type === "movie" ? "release_dates" : "content_ratings"}?`
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

export const peopleList = async (pageNum) => {
   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/person/popular?language=en-US&page=${pageNum}`
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

export const dataApi = async (type, movieId) => {
   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/${type}/${movieId}?append_to_response=watch_providers,videos,images,release_dates,recommendations,external_ids,credits,content_ratings&language=en-US`
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

// movieDataApi won't provide me the data for posters and backdrops, so I used the direct method for getting the images

// some updates (10/03): i just found out i don't need to create another api for getting data for tv, i can just use these same APIs and add just a second argument to specify whether the data is for a TV show or a movie, they have the same format just differ on what stream tyoe being requested
export const imagesApi = async (type, movieId) => {
   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/${type}/${movieId}/images`
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

export const videosApi = async (type, movieId) => {
   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/${type}/${movieId}/videos`
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

export const creditsApi = async (type, movieId) => {
   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/${type}/${movieId}/credits`
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

export const topLevelDataApi = async (type, movieId) => {
   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/${type}/${movieId}?language=en-US`
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

export const topLevelDataAppendCreditsApi = async (type, movieId) => {
   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/${type}/${movieId}?append_to_response=credits&language=en-US`
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

// For some reason it doesn't grab the data using append response
export const appendImagesApi = async (type, movieId) => {
   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/${type}/${movieId}?append_to_response=images&language=en-US`
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

export const appendVideosApi = async (type, movieId) => {
   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/${type}/${movieId}?append_to_response=videos&language=en-US`
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

export const languages = async () => {
   try {
      const response = await apiClient({
         url: 'https://api.themoviedb.org/3/configuration/languages'
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

export const fetchYoutubeData = async (videoId) => {
   try {
      const response = await youtubeApi.get('', {
         params: {
            part: 'snippet,statistics,contentDetails',
            id: videoId,
            key: import.meta.env.VITE_YT_API_ACCESS_KEY, // Your API key here
         },
      });
      return response.data;
   } catch (error) {
      console.log('Error fetching data from YouTube API', error);
   }
};

export const fetchMultipleVideosData = async (keys) => {
   try {
      const response = await youtubeApi.get(`?part=snippet,statistics,contentDetails&id=${keys.join(',')}&key=${import.meta.env.VITE_YT_API_ACCESS_KEY}`);

      return response.data.items; 
   } catch (error) {
      console.error('Error during fetching multiple videos data:', error);
      return [];
   }
};

export const fetchSearchTVWithCredits = async (query) => {
   try {
      // Fetch the TV show details first
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
      });

      if (response.data.results && response.data.results.length > 0) {
         const resultsWithCredits = await Promise.all(
            response.data.results.map(async (tvShow) => {
               const tvShowId = tvShow.id; // Extract the tv_show_id

               const creditsResponse = await apiClient({
                  url: `https://api.themoviedb.org/3/tv/${tvShowId}/credits?language=en-US`
               });

               tvShow.credits = creditsResponse.data;
               return tvShow;
            })
         );
         response.data.results = resultsWithCredits;
      }

      return response.data;
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
};

export const fetchSearchMovieWithCredits = async (query) => {
   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
      });

      if (response.data.results && response.data.results.length > 0) {
         const resultsWithCredits = await Promise.all(
            response.data.results.map(async (movie) => {
               const movieId = movie.id; // Extract the movie_id

               const creditsResponse = await apiClient({
                  url: `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`
               });

               movie.credits = creditsResponse.data;
               return movie;
            })
         );
         response.data.results = resultsWithCredits;
      }
      return response.data;
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
};

// My API

export const axiosPrivate = axios.create({
   baseURL: 'http://localhost:3000/',
   withCredentials: true
});

export const fetchMyData = async (type) => {
   try {
      const response = await axiosPrivate({
         url: `http://localhost:3000/${type}/`
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

export const getMyMovieDataApi = async (type, movieId) => {
   try {
      const response = await axiosPrivate({
         url: `http://localhost:3000/${type}/${movieId}`
      })

      const responseTwo = await axiosPrivate({
         url: `http://localhost:3000/${type}/${movieId}/recommendations`
      })

      const allResponseData = {
         ...response.data,
         movie: {
            ...response.data.movie,
            recommendations: responseTwo.data.recommendations
         }
      };

      return allResponseData
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

export const createMovie = async (data) => {
   try {
      const response = await axiosPrivate.post('/movie', data);
      console.log('Movie created successfully:', response.data);
      return response.data; // Return response if needed
   }
   catch (error) {
      console.error('Error creating movie:', error.response?.data || error.message);
   }
};

export const deleteMovie = async (id) => {
   try {
      const response = await axiosPrivate.delete(`/movie/${id}`);
      return response.data; 
   } 
   catch (error) {
      console.error('Error deleting movie:', error.response?.data || error.message);
      throw error;
   }
};

export const editPrimaryDetails = async (id, data) => {
   try {
      const response = await axiosPrivate.patch(`/movie/${id}/primary-details`, data);
      return response.data; 
   }
   catch (error) {
      console.error('Error modifying the movie data:', error.response?.data || error.message);
      throw error;
   }
}

export const addCastMember = async (id, data) => {
   try {
      const response = await axiosPrivate.patch(`/movie/${id}/cast`, data);
      return response.data; 
   }
   catch (error) {
      console.error('Error adding the cast member:', error.response?.data || error.message);
      throw error;
   }
}

export const deleteCastMemeber = async (id, castId) => {
   try {
      const response = await axiosPrivate.delete(`/movie/${id}/cast/${castId}`);
      return response.data; 
   }
   catch (error) {
      console.error('Error deleting the cast member:', error.response?.data || error.message);
      throw error;
   }
}

export const addCrewMember = async (id, data) => {
   try {
      const response = await axiosPrivate.patch(`/movie/${id}/crew`, data);
      return response.data; 
   }
   catch (error) {
      console.error('Error adding the crew member:', error.response?.data || error.message);
      throw error;
   }
}

export const deleteCrewMemeber = async (id, castId) => {
   try {
      const response = await axiosPrivate.delete(`/movie/${id}/crew/${castId}`);
      return response.data; 
   }
   catch (error) {
      console.error('Error deleting the crew member:', error.response?.data || error.message);
      throw error;
   }
}

export const changeExternalIds = async (id, data) => {
   try {
      const response = await axiosPrivate.patch(`/movie/${id}/external-ids`, data);
      return response.data; 
   }
   catch (error) {
      console.error('Error changing the external ids:', error.response?.data || error.message);
      throw error;
   }
}

export const addPoster = async (id, data) => {
   try {
      console.log(data);
      const response = await axiosPrivate.post(`/movie/${id}/posters`, data);
      return response.data; 
   }
   catch (error) {
      console.error('An error occured during the process:', error.response?.data || error.message);
      throw error;
   }
}

export const addBackdrop = async (id, data) => {
   try {
      const response = await axiosPrivate.post(`/movie/${id}/backdrops`, data);
      return response.data; 
   }
   catch (error) {
      console.error('An error occured during the process', error.response?.data || error.message);
      throw error;
   }
}

export const addLogo = async (id, data) => {
   try {
      const response = await axiosPrivate.post(`/movie/${id}/logos`, data);
      return response.data; 
   }
   catch (error) {
      console.error('An error occured during the process', error.response?.data || error.message);
      throw error;
   }
}

export const setPosterPath = async (id, data) => {
   try {
      const response = await axiosPrivate.patch(`/movie/${id}/poster-path`, data);
      return response.data; 
   }
   catch (error) {
      console.error('An error occured during the process', error.response?.data || error.message);
      throw error;
   }
}

export const setBackdropPath = async (id, data) => {
   try {
      const response = await axiosPrivate.patch(`/movie/${id}/backdrop-path`, data);
      return response.data; 
   }
   catch (error) {
      console.error('An error occured during the process', error.response?.data || error.message);
      throw error;
   }
}

export const addVideo = async (id, data) => {
   try {
      const response = await axiosPrivate.post(`/movie/${id}/videos`, data);
      return response.data; 
   }
   catch (error) {
      console.error('An error occured during the process', error.response?.data || error.message);
      throw error;
   }
}