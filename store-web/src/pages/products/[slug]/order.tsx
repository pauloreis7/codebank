import type { NextPage } from 'next'

import Head from 'next/head'
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  InputGroup,
  SimpleGrid,
  Text,
  VStack
} from '@chakra-ui/react'

import { BackButton } from '../../../components/BackButton'
import { Input } from '../../../components/Input'

const ProductOrder: NextPage = () => {
  return (
    <Flex as="main" w="100%" minH="100%" flexDirection="column">
      <Head>
        <title>{`{product.name} | CodeBank`}</title>
        <meta name="description" content="CodeBank Home" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex minHeight="100vh" flexDirection="column" alignItems="center">
        <Flex
          flexGrow="1"
          flexShrink="1"
          flexBasis="0"
          flexDirection="column"
          alignItems="center"
          w="100%"
          maxWidth="68rem"
          py="8"
          px="6"
        >
          <BackButton text="back" href="/" />

          <Flex
            as="section"
            w="100%"
            flexGrow="1"
            flexShrink="1"
            flexBasis="0"
            flexDirection="column"
            maxH={['100%', '100%', '20rem']}
            mt={['12', '12', '16']}
          >
            <Heading as="h1" w="100%" mb="12" textAlign="left" fontSize="5xl">
              Checkout
            </Heading>

            <Flex mb="12" alignItems="center">
              <Box
                p="0.5"
                mr="4"
                borderWidth="2px"
                borderColor="gray.300"
                borderRadius="full"
              >
                <Avatar maxWidth="3.5rem" maxHeight="3.5rem" name={'aa'} />
              </Box>

              <Box>
                <Text as="strong" display="block" fontSize="lg">
                  Product Name
                </Text>

                <Text as="span" fontSize="lg" color="gray.400">
                  $10.3
                </Text>
              </Box>
            </Flex>

            <VStack as="form" w="100%">
              <InputGroup>
                <SimpleGrid
                  w="100%"
                  minChildWidth="24rem"
                  mb="10"
                  gap="6"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Input name="card-name" label="name" error={undefined} />

                  <Input
                    name="card-number"
                    type="number"
                    label="card number"
                    error={undefined}
                  />

                  <Input
                    name="card-cvv"
                    type="number"
                    label="CVV"
                    error={undefined}
                  />

                  <Flex w="100%" align="center" gap="2">
                    <Input
                      name="card-expiration-month"
                      type="number"
                      label="expiration month"
                      error={undefined}
                    />

                    <Input
                      name="card-expiration-year"
                      type="number"
                      label="expiration year"
                      error={undefined}
                    />
                  </Flex>
                </SimpleGrid>
              </InputGroup>

              <Button
                type="submit"
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
                buy
              </Button>
            </VStack>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ProductOrder
