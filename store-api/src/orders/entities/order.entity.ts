import { CreditCard } from './creditCard.entity'
import { OrderItem } from './orderItem.entity'

export enum OrderStatus {
  'Approved' = 'approved',
  'Pending' = 'pending'
}

export class Order {
  id: string
  total: number
  status: OrderStatus = OrderStatus.Pending
  credit_card: CreditCard
  items: OrderItem[]
  created_at: Date
}
