import type { NextPage } from 'next'

import Head from 'next/head'
import Link from 'next/link'
import { Box, Flex, Heading, Image, Button } from '@chakra-ui/react'

import { BackButton } from '../../../components/BackButton'

const ProductDetails: NextPage = () => {
  return (
    <Flex as="main" w="100%" minH="100%" flexDirection="column">
      <Head>
        <title>Home | CodeBank</title>
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
          maxWidth="74rem"
          py="8"
          px="6"
        >
          <BackButton text="back to home" href="/" />

          <Flex
            as="section"
            w="100%"
            flexGrow="1"
            flexShrink="1"
            flexBasis="0"
            flexDirection={['column', 'column', 'row']}
            gap={['0', '0', '20']}
            maxH={['100%', '100%', '20rem']}
            mt={['12', '12', '24']}
          >
            <Box w="100%" h="100%" maxH="20rem">
              <Image
                src="https://source.unsplash.com/random?product,"
                alt={`{name} card image`}
                w="100%"
                h="100%"
                objectFit="cover"
                borderRadius="2xl"
              />
            </Box>

            <Flex
              w="100%"
              h="100%"
              maxWidth="30rem"
              flexDirection="column"
              py="8"
            >
              <Heading as="h1" w="100%" mb="5" textAlign="left">
                Product
              </Heading>

              <Heading
                as="h2"
                w="100%"
                mb="5"
                textAlign="left"
                fontFamily="Inter"
                fontSize="lg"
                fontWeight="400"
                color="gray.400"
              >
                $ 50.50
              </Heading>

              <Link
                href="/products/[slug]/order"
                as={`/products/{product.slug}/order`}
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
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ProductDetails
