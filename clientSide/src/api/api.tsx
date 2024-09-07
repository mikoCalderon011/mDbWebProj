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

export const watchProviderApi = async (code) => {
   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/watch/providers/movie?language=en-US&watch_region=${code}`
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

// Certification Country
export const certificationList = async () => {
   try {
      const response = await apiClient({
         url: "https://api.themoviedb.org/3/certification/movie/list"
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

export const movieDetailModal = async (movieId) => {
   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/movie/${movieId}?append_to_response=videos,credits&language=en-US`
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}

export const certificationsDetail = async (movieId) => {
   try {
      const response = await apiClient({
         url: `https://api.themoviedb.org/3/movie/${movieId}/release_dates?`
      })

      return response.data
   }
   catch (error) {
      console.log('Error during fetching of data', error);
   }
}