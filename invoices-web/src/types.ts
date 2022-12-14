export type InvoiceStatus = 'APPROVED' | 'REJECTED'

export type InvoiceProps = {
  payment_date: string
  transaction_id: string
  amount: number
  store: string
  status: InvoiceStatus
  description: string
}

export type GetInvoicesResponse = {
  id: string
  amount: number
  credit_card_id: string
  transaction_id: string
  store: string
  status: InvoiceStatus
  description: string
  payment_date: string
  created_at: string
}
