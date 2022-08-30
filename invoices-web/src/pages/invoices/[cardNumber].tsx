import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import Head from 'next/head'
import { useRouter } from 'next/router'
import axios, { AxiosError } from 'axios'
import { Flex, Heading, Spinner, VStack } from '@chakra-ui/react'

import { GetInvoicesResponse, InvoiceProps } from '../../types'
import { api } from '../../services/api'
import { useInvoices } from '../../hooks/useInvoices'

import { Header } from '../../components/Header'
import { BackButton } from '../../components/BackButton'
import { InvoicesErrorState } from '../../components/InvoicesErrorState'
import { Invoice } from '../../components/Invoice'

type InvoicesProps = {
  invoices: InvoiceProps[]
}

const Invoices: NextPage<InvoicesProps> = ({ invoices }: InvoicesProps) => {
  const router = useRouter()

  const { data, isLoading, isFetching, error } = useInvoices(
    String(router.query.cardNumber),
    invoices
  )

  return (
    <Flex
      as="main"
      w="100%"
      minH="100%"
      flexDirection="column"
      alignItems="center"
    >
      <Head>
        <title>Invoices | CodeBank</title>
        <meta name="description" content="CodeBank Invoices" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Flex
        flexDirection="column"
        alignItems="center"
        w="100%"
        maxWidth="65rem"
        pl="2"
        mt="8"
      >
        <BackButton text="Go to login" href="/" />

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
          <Flex
            w="100%"
            alignItems="center"
            justifyContent="space-between"
            mb="8"
          >
            <Heading as="h1" w="100%" textAlign="left" color="yellow.500">
              Invoices
            </Heading>

            {(isFetching || isLoading) && (
              <Flex alignItems="center" color="gray.500">
                <Spinner size="sm" mr="2" /> Fetching
              </Flex>
            )}
          </Flex>

          <VStack w="100%" gap="8" alignItems="center" justifyContent="center">
            {error ? (
              <InvoicesErrorState error={error as AxiosError<string>} />
            ) : (
              !isLoading &&
              data?.invoices.map(invoice => (
                <Invoice
                  key={invoice.transaction_id}
                  transactionId={invoice.transaction_id}
                  amount={invoice.amount}
                  store={invoice.store}
                  description={invoice.description}
                  paymentDate={invoice.payment_date}
                />
              ))
            )}
          </VStack>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Invoices

export const getStaticPaths: GetStaticPaths = async () => {
  return { paths: [], fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<InvoicesProps> = async ({
  params
}) => {
  try {
    const { data: invoices } = await api.get<GetInvoicesResponse[]>(
      `invoices/${params?.cardNumber}`
    )

    return {
      props: {
        invoices
      },
      revalidate: 1 * 60 // 60 seconds
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return { notFound: true }
    }

    throw error
  }
}
