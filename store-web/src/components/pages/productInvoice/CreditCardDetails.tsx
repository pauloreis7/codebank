import { Flex, Heading, Text, VStack } from '@chakra-ui/react'

type CreditCardDetailsProps = {
  creditCardNumber: string
  expirationMonth: string
  expirationYear: string
}

export function CreditCardDetails({
  creditCardNumber,
  expirationMonth,
  expirationYear
}: CreditCardDetailsProps) {
  return (
    <Flex w="100%" flexDirection="column">
      <Heading
        as="h2"
        w="100%"
        mb="5"
        textAlign="left"
        fontFamily="Inter"
        fontSize="xl"
        fontWeight="700"
        color="yellow.500"
      >
        Credit card:
      </Heading>

      <VStack w="100%" maxWidth="20rem" alignItems="flex-start">
        <Flex w="100%" alignItems="100%" justifyContent="space-between">
          <Text as="strong" textTransform="capitalize">
            number:
          </Text>

          <Text>{creditCardNumber}</Text>
        </Flex>

        <Flex w="100%" alignItems="100%" justifyContent="space-between">
          <Text as="strong" textTransform="capitalize">
            expiration:
          </Text>

          <Text>
            {expirationMonth}/{expirationYear}
          </Text>
        </Flex>
      </VStack>
    </Flex>
  )
}
