import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_INVOICES_API_URL
})
