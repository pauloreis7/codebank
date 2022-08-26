import { Flex, InputGroup, SimpleGrid } from '@chakra-ui/react'
import { FieldErrorsImpl, UseFormRegister } from 'react-hook-form'

import { OrderInputs } from '../../../types'
import { Input } from '../../Input'

type FormInputGroupProps = {
  register: UseFormRegister<OrderInputs>
  errors: FieldErrorsImpl<OrderInputs>
}

export function FormInputGroup({ register, errors }: FormInputGroupProps) {
  return (
    <InputGroup>
      <SimpleGrid
        w="100%"
        minChildWidth={['18rem', '24rem']}
        mb={['4', '10']}
        gap="6"
        alignItems="center"
        justifyContent="center"
      >
        <Input
          {...register('name')}
          label="name"
          error={errors.name}
          name="name"
        />

        <Input
          type="number"
          label="card number"
          error={errors.number}
          {...register('number')}
          name="number"
        />

        <Input
          {...register('cvv')}
          type="number"
          label="CVV"
          error={errors.cvv}
          name="cvv"
        />

        <Flex
          w="100%"
          flexDirection={['column', 'row']}
          alignItems="center"
          gap="3"
        >
          <Input
            {...register('expiration_month')}
            type="number"
            label="expiration month"
            error={errors.expiration_month}
            name="expiration_month"
          />

          <Input
            {...register('expiration_year')}
            type="number"
            label="expiration year"
            error={errors.expiration_year}
            name="expiration_year"
          />
        </Flex>
      </SimpleGrid>
    </InputGroup>
  )
}
