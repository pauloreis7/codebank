import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { Flex, Heading, SimpleGrid } from '@chakra-ui/react'

import { api } from '../services/api'
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
      </Head>

      <Flex flexDirection="column" alignItems="center">
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
                key={product.id}
                slug={product.id}
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
  try {
    const { data: products } = await api.get('products')

    return {
      props: {
        products
      }
    }
  } catch (error) {
    console.log('error ===>', error)
  }

  return {
    props: {
      products: []
    }
  }
}
