import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import Head from 'next/head'
import { AxiosError } from 'axios'
import { Box, Flex, Image } from '@chakra-ui/react'

import { ProductProps } from '../../../types'
import { api } from '../../../services/api'

import { ProductInfos } from '../../../components/pages/productDetails/ProductInfos'
import { BackButton } from '../../../components/BackButton'

type ProductDetailsProps = {
  product: ProductProps
}

const ProductDetails: NextPage<ProductDetailsProps> = ({
  product
}: ProductDetailsProps) => {
  return (
    <Flex as="main" w="100%" minH="100%" flexDirection="column">
      <Head>
        <title>{`${product.name} | CodeBank`}</title>
        <meta name="description" content="CodeBank Product details" />
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
            mt={['12', '12', '24']}
          >
            <Box w="100%" h="100%" maxH="20rem">
              <Image
                src={product.image_url}
                alt={`${product.name} card image`}
                w="100%"
                h="100%"
                objectFit="cover"
                borderRadius="2xl"
              />
            </Box>

            <ProductInfos
              name={product.name}
              description={product.description}
              price={product.price}
              slug={product.id}
            />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default ProductDetails

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps<ProductDetailsProps> = async ({
  params
}) => {
  try {
    const { data: product } = await api.get(`products/${params?.slug}`)

    return {
      props: {
        product
      },
      revalidate: 1 * 60 * 60
    }
  } catch (error) {
    if (error instanceof AxiosError && error?.response?.status === 404) {
      return { notFound: true }
    }

    throw error
  }
}
