import axios from 'axios'

const apiClient = axios.create({
   baseURL: 'https://api.themoviedb.org/3',
   headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_TMDB_API_READ_ACCESS_KEY}`
   },
})

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

export const movieDataApi = async (movieId) => {
   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=watch_providers,videos,images,release_dates,recommendations,external_ids,credits&language=en-US`
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

// movieDataApi won't provide me the data for posters and backdrops, so I used the direct method for getting the images
export const movieImagesApi = async (movieId) => {
   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/movie/${movieId}/images`
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}