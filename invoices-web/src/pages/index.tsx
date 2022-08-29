import type { NextPage } from 'next'

import { FormEvent, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { BsFillCreditCardFill } from 'react-icons/bs'
import { Button, Flex, VStack } from '@chakra-ui/react'

import { Input } from '../components/Input'
import { LoginTitle } from '../components/LoginTitle'

const Login: NextPage = () => {
  const router = useRouter()

  const [cardNumber, setCardNumber] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmitCardNumber(event: FormEvent) {
    event.preventDefault()

    setIsLoading(true)

    router.push(`invoices/${cardNumber}`)
  }

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
            <LoginTitle />

            <VStack
              w="100%"
              maxWidth="30rem"
              gap="4"
              p={['6', '8']}
              backgroundColor="gray.700"
              boxShadow="xl"
              borderRadius="sm"
            >
              <VStack
                as="form"
                onSubmit={handleSubmitCardNumber}
                w="100%"
                gap="2"
              >
                <Input
                  icon={BsFillCreditCardFill}
                  value={cardNumber}
                  name="card-number"
                  setValue={setCardNumber}
                  type="number"
                  autoComplete="current-card-number"
                  placeholder="Card number"
                  isRequired
                />

                <Button
                  type="submit"
                  w="100%"
                  h="3.125rem"
                  backgroundColor="yellow.500"
                  borderRadius="sm"
                  border="0"
                  fontWeight="bold"
                  textTransform="uppercase"
                  _hover={{
                    backgroundColor: 'yellow.600'
                  }}
                  _focus={{
                    backgroundColor: 'yellow.600'
                  }}
                  _active={{
                    backgroundColor: 'yellow.600'
                  }}
                  disabled={cardNumber.length !== 16 || isLoading}
                  isLoading={isLoading}
                >
                  Login
                </Button>
              </VStack>
            </VStack>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Login
