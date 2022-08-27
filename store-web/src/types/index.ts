export type ProductProps = {
  id: string
  name: string
  description: string
  image_url: string
  price: { s: number; e: number; d: number[] }
  created_at: string
}

export type OrderInputs = {
  number: string
  name: string
  expiration_month: number
  expiration_year: number
  cvv: string
}
