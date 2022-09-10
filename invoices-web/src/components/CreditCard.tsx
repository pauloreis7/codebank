import { Flex, Img, Text } from '@chakra-ui/react'

type CreditCardProps = {
  number: string
  name: string
  expirationMonth: string
  expirationYear: string
  CVV: string
}

export function CreditCard({
  number,
  name,
  expirationMonth,
  expirationYear,
  CVV
}: CreditCardProps) {
  const formattedCardNumber = number.replace(/\d{4}(?=.)/g, '$& ')

  return (
    <Flex
      w="100%"
      maxWidth="26rem"
      position="relative"
      alignItems="center"
      justifyContent="center"
      mr={['0', '0', '16']}
      mb={['10', '10', '0']}
      fontFamily="Noto Sans"
    >
      <Img src="/credit-card-back-template.svg" alt="Credit card template" />

      <Text
        position="absolute"
        top={['0.75rem', '0.75rem', '0.75rem', '1rem']}
        left="2.5rem"
        fontFamily="Lexend"
        fontSize="2xl"
        fontWeight="600"
        color="white"
      >
        Codebank
      </Text>

      <Text
        position="absolute"
        bottom="3.25rem"
        left={['lg', 'lg', '2rem', '3rem']}
        letterSpacing={['6px', '9px', '7px', '9px']}
        fontSize={['lg', 'lg', 'sm', 'lg']}
        fontWeight="600"
        color="gray.300"
      >
        {formattedCardNumber}
      </Text>

      <Text
        position="absolute"
        top="50%"
        left={['8rem', '8rem', '7rem', '8rem']}
        fontStyle="italic"
        letterSpacing="5px"
        fontFamily="Inter"
        fontSize="sm"
        fontWeight="600"
        color="gray.600"
      >
        {CVV}
      </Text>

      <Text
        position="absolute"
        bottom="0.75rem"
        left="2rem"
        letterSpacing={['1px', '2px', '1px', '2px']}
        fontSize={['sm', 'md', 'sm', 'md']}
        fontFamily="Inter"
        fontWeight="700"
      >
        {name}
      </Text>

      <Text
        position="absolute"
        bottom="0.75rem"
        right="1.5rem"
        letterSpacing="2px"
        fontSize="md"
        fontWeight="600"
        color="gray.300"
      >
        {expirationMonth}/{expirationYear}
      </Text>
    </Flex>
  )
}
