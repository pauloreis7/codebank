import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import Head from 'next/head'
import { AxiosError } from 'axios'
import { Badge, Box, Divider, Flex, Heading, Image } from '@chakra-ui/react'

import { api } from '../../services/api'
import { getOrderResponse, OrderProps } from '../../types'
import { ProductInfos } from '../../components/pages/productOrder/ProductInfos'
import { BackButton } from '../../components/BackButton'
import { CreditCardDetails } from '../../components/pages/productInvoice/CreditCardDetails'
import { InvoiceLink } from '../../components/pages/productInvoice/InvoiceLink'

const Order: NextPage<OrderProps> = ({
  orderId,
  total,
  creditCard,
  product
}: OrderProps) => {
  return (
    <Flex as="main" w="100%" minH="100%" flexDirection="column">
      <Head>
        <title>Order | CodeBank</title>
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
                src={product.imageUrl}
                alt={`${product.name} card image`}
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
                Order - #{orderId.slice(0, 10)}...
              </Heading>

              <ProductInfos
                name={product.name}
                imageUrl={product.imageUrl}
                price={total}
              />

              <InvoiceLink creditCardNumber={creditCard.number} />

              <Divider mt="2" mb="6" borderColor="gray.600" />

              <CreditCardDetails
                creditCardNumber={creditCard.number}
                expirationMonth={creditCard.expiration_month}
                expirationYear={creditCard.expiration_year}
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Order

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<OrderProps> = async ({
  params
}) => {
  try {
    const { data } = await api.get<getOrderResponse>(`orders/${params?.id}`)

    return {
      props: {
        orderId: data.order.id,
        total: data.order.total,
        creditCard: {
          number: data.order.credit_card_number,
          expiration_month: String(data.order.credit_card_expiration_month),
          expiration_year: String(data.order.credit_card_expiration_year)
        },
        product: {
          name: data.product.name,
          imageUrl: data.product.image_url
        }
      },
      revalidate: 1 * 60 * 30
    }
  } catch (error) {
    if (error instanceof AxiosError && error?.response?.status === 404) {
      return { notFound: true }
    }

    throw error
  }
}
