import { Link as ChakraLink, Flex, Icon, Text } from '@chakra-ui/react'
import { BiStore } from 'react-icons/bi'
import Link from 'next/link'

type HeaderProps = {
  href: string
}

export function Header({ href }: HeaderProps) {
  return (
    <Flex
      as="header"
      w="100%"
      px={['4', '8']}
      backgroundColor="yellow.600"
      boxShadow="dark-lg"
    >
      <Link href={href} as={href} passHref>
        <ChakraLink
          display="flex"
          alignItems="center"
          py="4"
          _hover={{
            textDecoration: 'none'
          }}
        >
          <Icon as={BiStore} mr="2" fontSize="3xl" color="gray.300" />

          <Text fontSize="2xl" fontWeight="bold">
            CodeStore
          </Text>
        </ChakraLink>
      </Link>
    </Flex>
  )
}
