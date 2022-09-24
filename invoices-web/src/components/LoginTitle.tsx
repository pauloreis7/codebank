import { Box, Flex, Heading, Img, Text } from '@chakra-ui/react'

export function LoginTitle() {
  return (
    <Flex flexDirection="column" w="100%" maxWidth="30rem">
      <Flex mb="4" alignItems="center">
        <Img
          src="/logo.png"
          alt="Codebank Logo"
          mr="4"
          w="100%"
          maxWidth="2.25rem"
        />

        <Text fontSize={['2xl', '3xl']} fontWeight="bold">
          CodeBank
        </Text>
      </Flex>

      <Heading
        fontSize={['2rem', '3rem', '3rem', '3.25rem']}
        lineHeight={['3.5rem', '4rem']}
        mb="6"
        fontFamily="Inter"
      >
        Enter card for <Box as="br" />
        invoices
      </Heading>
    </Flex>
  )
}
