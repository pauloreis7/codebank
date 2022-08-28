import { Box, Flex, Heading, Icon, Text } from '@chakra-ui/react'
import { RiBankLine } from 'react-icons/ri'

export function LoginTitle() {
  return (
    <Flex flexDirection="column" w="100%" maxWidth="30rem">
      <Flex mb="4" alignItems="center">
        <Icon
          as={RiBankLine}
          mr="2"
          fontSize={['3xl', '4xl']}
          color="gray.300"
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
