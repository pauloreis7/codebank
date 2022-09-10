import { BsFillCreditCardFill } from 'react-icons/bs'
import { Button, VStack } from '@chakra-ui/react'
import { FormEvent } from 'react'

import { Input } from '../components/Input'

type IssueCardFormProps = {
  value: string
  isLoading: boolean
  setValue: (value: string) => void
  handleSubmit: (event: FormEvent<Element>) => Promise<void>
}

export function IssueCardForm({
  value,
  setValue,
  isLoading,
  handleSubmit
}: IssueCardFormProps) {
  return (
    <VStack as="form" onSubmit={handleSubmit} w="100%" gap="2">
      <Input
        icon={BsFillCreditCardFill}
        value={value}
        name="card-name"
        setValue={setValue}
        autoComplete="current-card-name"
        placeholder="Full name"
        isRequired
        valueLengthCondition={value.length >= 5}
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
        disabled={value.length < 5 || isLoading}
        isLoading={isLoading}
      >
        Generate
      </Button>
    </VStack>
  )
}
