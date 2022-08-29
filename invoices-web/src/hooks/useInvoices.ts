import { useQuery } from '@tanstack/react-query'

import { InvoiceProps } from '../types'
import { api } from '../services/api'

type GetInvoicesResponse = {
  invoices: InvoiceProps[]
}

type GetInvoicesApiResponse = InvoiceProps[]

async function getInvoices(
  creditCardNumber?: string
): Promise<GetInvoicesResponse | null> {
  if (!creditCardNumber) {
    return null
  }

  const { data: invoices } = await api.get<GetInvoicesApiResponse>(
    `invoices/${creditCardNumber}`
  )

  return { invoices }
}

export function useInvoices(creditCardNumber?: string) {
  return useQuery(
    ['invoices', creditCardNumber],
    () => getInvoices(creditCardNumber),
    {
      staleTime: 1000 * 15 // 15 seconds,
    }
  )
}
