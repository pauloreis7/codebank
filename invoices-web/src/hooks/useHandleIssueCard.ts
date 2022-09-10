import { FormEvent, useState } from 'react'
import { AxiosError } from 'axios'
import { useToast } from '@chakra-ui/react'

import { useIssueCardMutation } from '../hooks/useIssueCardMutation'

export const useHandleIssueCard = () => {
  const toast = useToast()

  const [name, setName] = useState('')

  const {
    mutateAsync,
    data,
    isLoading: issueCardIsLoading
  } = useIssueCardMutation(name)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    await mutateAsync(name, {
      onError(err) {
        const error = err as AxiosError<{ message: string }>

        toast({
          title: 'Error to issue credit card.',
          description: error.response?.data?.message ?? error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right'
        })
      },
      onSuccess() {
        toast({
          title: 'success generating credit card.',
          description: 'Copy card infos, will not be displayed again!',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top-right'
        })
      }
    })
  }

  return {
    name,
    setName,
    data,
    issueCardIsLoading,
    handleSubmit
  }
}
