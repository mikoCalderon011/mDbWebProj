import React from 'react'
import axios from 'axios'

const apiClient = axios.create({
   baseURL: 'https://api.themoviedb.org/3',
   headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${import.meta.env.VITE_TMDB_API_READ_ACCESS_KEY}`
   },
})

export const apiFetch = async(endpoint) => {
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