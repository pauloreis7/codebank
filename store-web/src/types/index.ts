export type ProductProps = {
  id: string
  name: string
  description: string
  image_url: string
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

export type OrderProps = {
  orderId: string
  total: number
  creditCard: {
    number: string
    expiration_month: string
    expiration_year: string
  }
  product: {
    name: string
    imageUrl: string
  }
}

export type getOrderResponse = {
  order: {
    id: string
    total: number
    credit_card_number: string
    credit_card_expiration_month: number
    credit_card_expiration_year: number
  }
  product: {
    image_url: string
    name: string
  }
}
