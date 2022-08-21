import { forwardRef, ForwardRefRenderFunction } from 'react'
import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormErrorMessage
} from '@chakra-ui/react'

interface InputProps extends ChakraInputProps {
  name: string
  label?: string
  error?: Error
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, error = null, ...rest },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      {label && (
        <FormLabel
          id={`field-${label}-label`}
          htmlFor={name}
          textTransform="capitalize"
          color="gray.500"
        >
          {label}
        </FormLabel>
      )}

      <ChakraInput
        name={name}
        id={name}
        pl="4"
        variant="flushed"
        color="gray.400"
        focusBorderColor="yellow.500"
        bgColor="gray.700"
        transition="filter, border-color 0.4s"
        _hover={{
          borderColor: 'yellow.300',
          filter: 'brightness(1.2)'
        }}
        size="lg"
        ref={ref}
        {...rest}
      />

      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  )
}

export const Input = forwardRef(InputBase)
