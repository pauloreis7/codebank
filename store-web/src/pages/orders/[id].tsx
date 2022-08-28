import type { NextPage } from 'next'

import Head from 'next/head'
import { Badge, Box, Divider, Flex, Heading, Image } from '@chakra-ui/react'

import { ProductInfos } from '../../components/pages/productOrder/ProductInfos'
import { BackButton } from '../../components/BackButton'
import { CreditCardDetails } from '../../components/pages/productInvoice/CreditCardDetails'
import { InvoiceLink } from '../../components/pages/productInvoice/InvoiceLink'

const Order: NextPage = () => {
  return (
    <Flex as="main" w="100%" minH="100%" flexDirection="column">
      <Head>
        <title>{`Order | CodeBank`}</title>
        <meta name="description" content="CodeBank Order details" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex minHeight="90vh" flexDirection="column" alignItems="center">
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
            mt={['12', '12', '20']}
          >
            <Box w="100%" h="100%" maxH="20rem">
              <Image
                src="https://source.unsplash.com/random?product,10"
                alt={`{product.name} card image`}
                w="100%"
                h="100%"
                objectFit="cover"
                borderRadius="2xl"
              />
            </Box>

            <Flex w="100%" h="100%" maxWidth="30rem" flexDirection="column">
              <Box ml="1" mb="1">
                <Badge variant="outline" colorScheme="green">
                  APPROVED
                </Badge>
              </Box>

              <Heading
                as="h1"
                w="100%"
                mb="6"
                textAlign="left"
                textTransform="capitalize"
              >
                Order - #15162627182
              </Heading>

              <ProductInfos
                name={'product.name'}
                imageUrl={'product.image_url'}
                price={'formattedPrice'}
              />

              <InvoiceLink orderId="123456" />

              <Divider mt="2" mb="6" borderColor="gray.600" />

              <CreditCardDetails
                creditCardNumber="1234567891234567"
                expirationMonth="04"
                expirationYear="2027"
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Order
