import { useRouter } from 'next/router'
import { useToast } from '@chakra-ui/react'
import { AxiosError } from 'axios'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { OrderInputs } from '../types'
import { api } from '../services/api'
import { orderFormSchema } from '../utils/products'

export const useOrder = (productId: string) => {
  const toast = useToast()
  const router = useRouter()

  const { register, handleSubmit, formState } = useForm<OrderInputs>({
    resolver: yupResolver(orderFormSchema)
  })

  const { errors, isSubmitting } = formState

  const onSubmit: SubmitHandler<OrderInputs> = async data => {
    data.expiration_month = Number(data.expiration_month)
    data.expiration_year = Number(data.expiration_year)

    try {
      const { data: orderData } = await api.post<{ orderId: string }>(
        'orders',
        {
          credit_card: data,
          items: [{ product_id: productId, quantity: 1 }]
        }
      )

      toast({
        title: 'Successful purchase.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })

      router.push(`../../orders/${orderData.orderId}`)
    } catch (err) {
      const error = err as AxiosError<{ message: string }>

      console.error(error)

      toast({
        title: 'Error in transaction order.',
        description: error.response?.data?.message ?? error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top-right'
      })
    }
  }

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit
  }
}
