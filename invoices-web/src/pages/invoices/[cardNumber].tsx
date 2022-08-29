import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'

import Head from 'next/head'
import { useState } from 'react'
import axios from 'axios'
import { Flex, Heading, VStack } from '@chakra-ui/react'

import { InvoiceProps } from '../../types'

import { Header } from '../../components/Header'
import { BackButton } from '../../components/BackButton'
import { Invoice } from '../../components/Invoice'
import { api } from '../../services/api'

type InvoicesProps = {
  invoices: InvoiceProps[]
}

const Invoices: NextPage<InvoicesProps> = ({ invoices }: InvoicesProps) => {
  const [invoicesList, setInvoicesList] = useState<InvoiceProps[]>(invoices)

  console.log(setInvoicesList)

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
          <Heading as="h1" w="100%" textAlign="left" mb="8" color="yellow.500">
            Invoices
          </Heading>

          <VStack w="100%" gap="8" alignItems="center" justifyContent="center">
            {invoicesList.map(invoice => (
              <Invoice
                key={invoice.transactionId}
                transactionId={invoice.transactionId}
                amount={invoice.amount}
                store={invoice.store}
                description={invoice.description}
                paymentDate={invoice.paymentDate}
              />
            ))}
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
    const { data: invoices } = await api.get(`invoices/${params?.cardNumber}`)

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
