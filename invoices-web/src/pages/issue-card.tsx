import type { NextPage } from 'next'

import Head from 'next/head'
import Link from 'next/link'
import { Link as ChakraLink, Flex, Text } from '@chakra-ui/react'

import { useHandleIssueCard } from '../hooks/useHandleIssueCard'
import { IssueCardTitle } from '../components/IssueCardTitle'
import { CreditCard } from '../components/CreditCard'
import { IssueCardForm } from '../components/IssueCardForm'

const IssueCard: NextPage = () => {
  const { data, name, setName, issueCardIsLoading, handleSubmit } =
    useHandleIssueCard()

  return (
    <Flex as="main" w="100%" minH="100%" flexDirection="column">
      <Head>
        <title>Invoices | Codebank</title>
        <meta name="description" content="Invoices Codebank" />
      </Head>

      <Flex
        minHeight="100vh"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
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
            flexGrow="1"
            flexShrink="1"
            flexBasis="0"
            flexDirection={{ base: 'column', sm: 'column', md: 'row' }}
            alignItems="center"
            pt={{ base: '0', sm: '0', md: '7' }}
          >
            {data ? (
              <CreditCard
                number={data?.creditCard.credit_card_number}
                name={data?.creditCard.credit_card_name}
                expirationMonth={data?.creditCard.credit_card_expiration_month}
                expirationYear={data?.creditCard.credit_card_expiration_year}
                CVV={data?.creditCard.credit_card_CVV}
              />
            ) : (
              <IssueCardTitle />
            )}

            <Flex
              w="100%"
              maxWidth="30rem"
              flexDirection="column"
              gap="4"
              p={['6', '8']}
              backgroundColor="gray.700"
              boxShadow="xl"
              borderRadius="sm"
            >
              <IssueCardForm
                value={name}
                setValue={setName}
                isLoading={issueCardIsLoading}
                handleSubmit={handleSubmit}
              />

              <Flex
                w="100%"
                alignItems="center"
                justifyContent="center"
                fontSize="sm"
                color="gray.400"
              >
                <Text mr="1">See card invoices?</Text>

                <Link href="/" as="/" passHref>
                  <ChakraLink
                    fontWeight="600"
                    color="yellow.500"
                    opacity="0.8"
                    transition="filter 0.2s"
                    _hover={{
                      filter: 'brightness(1.2)'
                    }}
                  >
                    back to login
                  </ChakraLink>
                </Link>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default IssueCard
