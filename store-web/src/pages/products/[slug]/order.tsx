import type { GetServerSideProps, NextPage } from 'next'

import Head from 'next/head'
import { useRouter } from 'next/router'
import { Button, Flex, Heading, useToast, VStack } from '@chakra-ui/react'
import { AxiosError } from 'axios'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { OrderInputs, ProductProps } from '../../../types'
import { apiRoutes } from '../../../services/api'
import { orderFormSchema } from '../../../utils/products'

import { BackButton } from '../../../components/BackButton'
import { ProductInfos } from '../../../components/pages/ProductOrder/ProductInfos'
import { FormInputGroup } from '../../../components/pages/ProductOrder/FormInputGroup'

type ProductOrderProps = {
  product: ProductProps
}

const ProductOrder: NextPage<ProductOrderProps> = ({
  product
}: ProductOrderProps) => {
  const toast = useToast()
  const router = useRouter()

  const { register, handleSubmit, formState } = useForm<OrderInputs>({
    resolver: yupResolver(orderFormSchema)
  })
  const { errors, isSubmitting } = formState

  const onSubmit: SubmitHandler<OrderInputs> = async data => {
    try {
      console.log(data)

      toast({
        title: 'Successful purchase.',
        status: 'success',
        duration: 6000,
        isClosable: true,
        position: 'top-right'
      })

      router.push('/')
    } catch (err) {
      const error = err as Error

      toast({
        title: 'Error in transaction order.',
        description: error.message,
        status: 'error',
        duration: 6000,
        isClosable: true,
        position: 'top-right'
      })
    }
  }

  return (
    <Flex as="main" w="100%" minH="100%" flexDirection="column">
      <Head>
        <title>{`${product.name} | Checkout`}</title>
        <meta name="description" content="CodeBank Checkout" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex flexDirection="column" alignItems="center">
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
          onSubmit={handleSubmit(onSubmit)}
        >
          <BackButton text="back" href={`/products/${product.slug}`} />

          <Flex
            as="section"
            w="100%"
            flexGrow="1"
            flexShrink="1"
            flexBasis="0"
            flexDirection="column"
            mt={['4', '4', '6']}
          >
            <Heading as="h1" w="100%" mb="12" textAlign="left" fontSize="5xl">
              Checkout
            </Heading>

            <ProductInfos
              name={product.name}
              imageUrl={product.image_url}
              price={product.price}
            />

            <VStack as="form" w="100%">
              <FormInputGroup register={register} errors={errors} />

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
                isLoading={isSubmitting}
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

export const getServerSideProps: GetServerSideProps<
  ProductOrderProps
> = async ({ params }) => {
  try {
    const { data: product } = await apiRoutes.get(`/products/${params?.slug}`)

    return {
      props: {
        product
      }
    }
  } catch (error) {
    if (error instanceof AxiosError && error?.response?.status === 404) {
      return { notFound: true }
    }

    throw error
  }
}
