import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'
import {
  Box,
  Flex,
  Image,
  Text,
  Link as ChakraLink,
  Icon
} from '@chakra-ui/react'

type ProductProps = {
  slug: string
  imageUrl: string
  name: string
}

export function Product({ slug, imageUrl, name }: ProductProps) {
  return (
    <Flex
      key={slug}
      w="100%"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      backgroundColor="gray.900"
      boxShadow="dark-lg"
    >
      <Box mb="4" w="100%" height="12rem">
        <Image
          src={imageUrl}
          alt={`${name} card image`}
          w="100%"
          h="100%"
          objectFit="cover"
        />
      </Box>

      <Flex w="100%" h="100%" flexDirection="column" px="4" py="2">
        <Text
          as="strong"
          w="100%"
          mb="4"
          textTransform="capitalize"
          fontSize="2xl"
        >
          {name}
        </Text>

        <Link href="/products/[slug]" as={`/products/${slug}`} passHref>
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
              backgroundColor: 'whiteAlpha.100',
              filter: 'brightness(0.9)'
            }}
            _focus={{
              outlineColor: 'gray.600'
            }}
          >
            <Text
              mr="2"
              fontWeight="600"
              textTransform="uppercase"
              color="yellow.500"
            >
              buy now
            </Text>

            <Icon as={FiArrowRight} color="yellow.500" fontSize="xl" />
          </ChakraLink>
        </Link>
      </Flex>
    </Flex>
  )
}
