import { CreditCard } from './creditCard.entity'

export class Invoice {
  id: string
  amount: number
  payment_date: Date
  credit_card_id: string
  transaction_id: string
  store: string
  description: string
  credit_card: CreditCard
  created_at: Date
}
