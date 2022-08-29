import { useQuery } from '@tanstack/react-query'

import { InvoiceProps } from '../types'
import { api } from '../services/api'

type GetInvoicesResponse = {
  invoices: InvoiceProps[]
}

type GetInvoicesApiResponse = InvoiceProps[]

const REFETCH_INTERVAL = 1000 * 10 // 10 seconds

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

export function useInvoices(
  creditCardNumber: string,
  initialInvoicesData: InvoiceProps[]
) {
  return useQuery(
    ['invoices', creditCardNumber],
    () => getInvoices(creditCardNumber),
    {
      staleTime: REFETCH_INTERVAL,
      refetchInterval: REFETCH_INTERVAL,
      enabled: creditCardNumber?.length === 16,
      initialData: { invoices: initialInvoicesData }
    }
  )
}
