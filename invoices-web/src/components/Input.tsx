import {
  FormControl,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  InputGroup,
  InputLeftElement,
  Icon as ChakraIcon
} from '@chakra-ui/react'
import { IconType } from 'react-icons'

interface InputProps extends ChakraInputProps {
  icon?: IconType
  value: string
  valueLengthCondition: boolean
  setValue: (value: string) => void
}

export function Input({
  icon: Icon,
  value,
  setValue,
  valueLengthCondition,
  ...rest
}: InputProps) {
  return (
    <FormControl isInvalid={false}>
      <InputGroup w="100%" h="3.125rem">
        <InputLeftElement h="100%">
          <ChakraIcon
            as={Icon}
            color={valueLengthCondition ? 'yellow.500' : 'gray.600'}
            width="1.25rem"
            height="1.25rem"
          />
        </InputLeftElement>

        <ChakraInput
          w="100%"
          h="100%"
          color="gray.100"
          bgColor="gray.800"
          variant="filled"
          borderColor="gray.800"
          borderRadius="sm"
          value={value}
          onChange={event => setValue(event.target.value)}
          _hover={{
            borderColor: 'yellow.500'
          }}
          _placeholder={{
            color: 'gray.500'
          }}
          _focus={{
            bgColor: 'gray.800',
            borderColor: 'yellow.500'
          }}
          _invalid={{
            borderColor: 'red.500'
          }}
          {...rest}
        />
      </InputGroup>
    </FormControl>
  )
}
