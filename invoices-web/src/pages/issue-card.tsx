import type { NextPage } from 'next'

import { FormEvent, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { BsFillCreditCardFill } from 'react-icons/bs'
import {
  Link as ChakraLink,
  Button,
  Flex,
  VStack,
  Text
} from '@chakra-ui/react'

import { Input } from '../components/Input'
// import { IssueCardTitle } from '../components/IssueCardTitle'
import { CreditCard } from '../components/CreditCard'

const IssueCard: NextPage = () => {
  const router = useRouter()

  const [name, setName] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmitName(event: FormEvent) {
    event.preventDefault()

    setIsLoading(true)

    router.push(`invoices/${name}`)
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
            {/* <IssueCardTitle /> */}

            <CreditCard
              number={'1234 5678 9123 4567'}
              name={'PAULO SILVA DOS REIS'}
              expirationMonth={'02'}
              expirationYear={'2025'}
              CVV={'123'}
            />

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
              <VStack as="form" onSubmit={handleSubmitName} w="100%" gap="2">
                <Input
                  icon={BsFillCreditCardFill}
                  value={name}
                  name="card-name"
                  setValue={setName}
                  autoComplete="current-card-name"
                  placeholder="Full name"
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
                  disabled={name.length !== 5 || isLoading}
                  isLoading={isLoading}
                >
                  Generate
                </Button>
              </VStack>

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
