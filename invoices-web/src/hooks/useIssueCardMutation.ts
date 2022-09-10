import { useMutation } from '@tanstack/react-query'

import { api } from '../services/api'

type IssueCreditCardResponse = {
  credit_card_number: string
  credit_card_name: string
  credit_card_expiration_month: string
  credit_card_expiration_year: string
  credit_card_CVV: string
  credit_card_balance: string
  credit_card_limit: string
  issue_date: string
}

async function issueCreditCard(name: string) {
  const { data: creditCard } = await api.post<IssueCreditCardResponse>(
    'credit-cards',
    {
      name
    }
  )

  return { creditCard }
}

export function useIssueCardMutation(name: string) {
  return useMutation(['issueCreditCard', name], (name: string) =>
    issueCreditCard(name)
  )
}
