import { Link as ChakraLink, Icon, Text } from '@chakra-ui/react'
import Link from 'next/link'
import { FiArrowLeft } from 'react-icons/fi'

type BackButtonProps = {
  text: string
  href: string
}

export function BackButton({ text, href }: BackButtonProps) {
  return (
    <Link href={href} as={href} passHref>
      <ChakraLink
        display="flex"
        alignItems="center"
        mr="auto"
        p="2"
        color="gray.200"
        backgroundColor="transparent"
        borderRadius="md"
        fontWeight="400"
        textTransform="lowercase"
        _hover={{
          backgroundColor: 'whiteAlpha.200',
          filter: 'brightness(0.9)'
        }}
        _focus={{
          outlineColor: 'gray.600'
        }}
      >
        <Icon as={FiArrowLeft} color="gray.300" />

        <Text ml="4" fontWeight="medium">
          {text}
        </Text>
      </ChakraLink>
    </Link>
  )
}
