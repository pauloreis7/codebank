import { Badge, Flex, Heading, Text } from '@chakra-ui/react'

import { InvoiceStatus } from '../types'

type InvoiceProps = {
  paymentDate: string
  transactionId: string
  amount: number
  status: InvoiceStatus
  store: string
  description: string
}

const orderStatusColors = {
  APPROVED: 'green',
  REJECTED: 'red'
}

export function Invoice({
  paymentDate,
  transactionId,
  amount,
  store,
  status,
  description
}: InvoiceProps) {
  return (
    <Flex
      w="100%"
      flexDirection="column"
      pb="6"
      borderBottomWidth="1px"
      borderBottomColor="gray.600"
    >
      <Flex alignItems="center" mb="3" gap="5">
        <Text as="span" color="gray.400">
          {new Date(paymentDate).toLocaleDateString('en', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
          })}
        </Text>

        <Badge variant="outline" colorScheme={orderStatusColors[status]}>
          {status}
        </Badge>
      </Flex>

      <Flex
        w="100%"
        flexDirection={['column', 'column', 'row']}
        alignItems={['flex-start', 'flex-start', 'center']}
        justifyContent="space-between"
        mb="3"
      >
        <Heading as="strong" mr="2">
          Transac. - #{transactionId.slice(0, 16)}...
        </Heading>

        <Text as="span" color="gray.400" fontSize="xl">
          ${amount}
        </Text>
      </Flex>

      <Text mb="3" fontSize="lg" fontWeight="600" color="gray.300">
        Store: {store}
      </Text>

      <Text color="gray.500">{description}</Text>
    </Flex>
  )
}
