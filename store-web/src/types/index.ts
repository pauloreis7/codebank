export type ProductProps = {
  id: string
  name: string
  description: string
  image_url: string
  slug: string
  price: number
  created_at: string
}

export type OrderInputs = {
  number: string
  name: string
  expiration_month: number
  expiration_year: number
  cvv: string
}
