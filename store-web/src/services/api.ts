import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STORE_API_URL
})
