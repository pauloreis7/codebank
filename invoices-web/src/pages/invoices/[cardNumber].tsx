import type { NextPage } from 'next'
import Head from 'next/head'
import { Flex, Heading, VStack } from '@chakra-ui/react'

import { Header } from '../../components/Header'
import { BackButton } from '../../components/BackButton'
import { Invoice } from '../../components/Invoice'

const Invoices: NextPage = () => {
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
        maxWidth="62.5rem"
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

          <VStack w="100%" gap="4" alignItems="center" justifyContent="center">
            <Invoice
              transactionId="12343-121287-124567-1234"
              amount={30.25}
              store="Some store"
              description="Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Numquam, assumenda ab! Eaque dicta"
              paymentDate="Sun Aug 28 2022 20:53:28 GMT-0300 (Horário Padrão de Brasília)"
            />
          </VStack>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Invoices
