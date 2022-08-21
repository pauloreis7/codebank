import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { Flex, Heading, SimpleGrid } from '@chakra-ui/react'

import { apiRoutes } from '../services/api'
import { ProductProps } from '../types'

import { Product } from '../components/pages/home/Product'

type HomeProps = {
  products: ProductProps[]
}

const Home: NextPage<HomeProps> = ({ products }: HomeProps) => {
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
          maxWidth="62.5rem"
          p="8"
        >
          <Heading as="h1" w="100%" textAlign="left">
            Products Home
          </Heading>

          <SimpleGrid
            w="100%"
            minChildWidth={['14rem', '18rem']}
            gap="4"
            mt="6"
            alignItems="center"
            justifyContent="center"
          >
            {products.map(product => (
              <Product
                key={product.slug}
                slug={product.slug}
                name={product.name}
                imageUrl={product.image_url}
              />
            ))}
          </SimpleGrid>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Home

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const { data: products } = await apiRoutes.get('products')

  return {
    props: {
      products
    }
  }
}
