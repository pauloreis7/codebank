import { useMutation } from '@tanstack/react-query'

import { api } from '../services/api'

type IssueCreditCardResponse = {
  creditCardNumber: string
  creditCardName: string
  creditCardExpirationMonth: string
  creditCardExpirationYear: string
  creditCard_CVV: string
}

async function issueCreditCard(name: string) {
  const { data: creditCard } = await api.post<IssueCreditCardResponse>(
    'credit-cards',
    {
      cardName: name
    }
  )

  return { creditCard }
}

export function useIssueCardMutation(name: string) {
  return useMutation(['issueCreditCard', name], (name: string) =>
    issueCreditCard(name)
  )
}
