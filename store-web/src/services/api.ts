import axios from 'axios'

export const apiRoutes = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STORE_API_URL
})
