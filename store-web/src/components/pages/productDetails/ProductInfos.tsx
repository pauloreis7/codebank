import Link from 'next/link'
import { Flex, Heading, Button, Text } from '@chakra-ui/react'

type ProductInfosProps = {
  name: string
  slug: string
  price: string
  description: string
}

export function ProductInfos({
  name,
  description,
  price,
  slug
}: ProductInfosProps) {
  return (
    <Flex w="100%" h="100%" maxWidth="30rem" flexDirection="column" py="8">
      <Heading
        as="h1"
        w="100%"
        mb="2"
        textAlign="left"
        textTransform="capitalize"
      >
        {name}
      </Heading>

      <Text mb="5" color="gray.500">
        {description}
      </Text>

      <Heading
        as="h2"
        w="100%"
        mb="5"
        textAlign="left"
        fontFamily="Inter"
        fontSize="3xl"
        fontWeight="700"
        color="gray.300"
      >
        $ {price}
      </Heading>

      <Link
        href="/products/[slug]/order"
        as={`/products/${slug}/order`}
        passHref
      >
        <Button
          as="a"
          w="100%"
          h="3.125rem"
          mt="auto"
          backgroundColor="yellow.500"
          borderRadius="md"
          border="0"
          fontWeight="bold"
          textTransform="uppercase"
          _hover={{
            backgroundColor: 'yellow.600'
          }}
          _focus={{
            backgroundColor: 'yellow.600'
          }}
        >
          buy now
        </Button>
      </Link>
    </Flex>
  )
}
