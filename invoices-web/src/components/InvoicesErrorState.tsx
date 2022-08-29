import { Flex, Heading, Text } from '@chakra-ui/react'
import { AxiosError } from 'axios'

type InvoicesErrorStateProps = {
  error: AxiosError<string>
}

export function InvoicesErrorState({ error }: InvoicesErrorStateProps) {
  return (
    <Flex flexDirection="column" justifyContent="center">
      <Heading mb="3">Error to get invoices :/</Heading>

      <Text fontSize="xl" textAlign="center" color="gray.500">
        {error?.response?.data ?? error.message}
      </Text>
    </Flex>
  )
}
