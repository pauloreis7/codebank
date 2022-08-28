import { Flex, Text, Link as ChakraLink } from '@chakra-ui/react'

type InvoiceLinkProps = {
  orderId: string
}

export function InvoiceLink({ orderId }: InvoiceLinkProps) {
  return (
    <Flex w="100%" alignItems="center" mt="4">
      <Text fontWeight="600" color="white">
        Go to invoice:
      </Text>

      <ChakraLink
        href={`${process.env.NEXT_PUBLIC_INVOICES_URL}/invoice/${orderId}`}
        isExternal
        ml="2"
        color="yellow.500"
        fontWeight="600"
        _hover={{
          transition: 'filter 0.2s',
          textDecoration: 'underline',
          filter: 'brightness(0.8)'
        }}
      >
        {process.env.NEXT_PUBLIC_INVOICES_URL}
      </ChakraLink>
    </Flex>
  )
}
