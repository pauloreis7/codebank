import { Flex, InputGroup, SimpleGrid } from '@chakra-ui/react'

import { Input } from '../../Input'

export function FormInputGroup() {
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
        <Input name="card-name" label="name" error={undefined} />

        <Input
          name="card-number"
          type="number"
          label="card number"
          error={undefined}
        />

        <Input name="card-cvv" type="number" label="CVV" error={undefined} />

        <Flex
          w="100%"
          flexDirection={['column', 'row']}
          alignItems="center"
          gap="3"
        >
          <Input
            name="card-expiration-month"
            type="number"
            label="expiration month"
            error={undefined}
          />

          <Input
            name="card-expiration-year"
            type="number"
            label="expiration year"
            error={undefined}
          />
        </Flex>
      </SimpleGrid>
    </InputGroup>
  )
}
