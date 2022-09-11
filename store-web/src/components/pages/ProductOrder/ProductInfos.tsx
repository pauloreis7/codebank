import { Avatar, Box, Flex, Text } from '@chakra-ui/react'

type ProductInfosProps = {
  name: string
  imageUrl: string
  price: number
}

export function ProductInfos({ name, imageUrl, price }: ProductInfosProps) {
  return (
    <Flex alignItems="center">
      <Box
        p="0.5"
        mr="4"
        borderWidth="2px"
        borderColor="gray.300"
        borderRadius="full"
      >
        <Avatar
          src={imageUrl}
          name={name}
          maxWidth="3.5rem"
          maxHeight="3.5rem"
        />
      </Box>

      <Box>
        <Text
          as="strong"
          textTransform="uppercase"
          display="block"
          fontSize="lg"
        >
          {name}
        </Text>

        <Text as="span" fontSize="lg" color="gray.400">
          ${price}
        </Text>
      </Box>
    </Flex>
  )
}
