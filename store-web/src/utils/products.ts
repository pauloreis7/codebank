import * as yup from 'yup'

export const orderFormSchema = yup
  .object({
    name: yup.string().required('name required'),
    number: yup.string().required('number required').min(16).max(16),
    cvv: yup.string().required('cvv required').min(3).max(4),
    expiration_month: yup
      .string()
      .required('expiration_month required')
      .min(2)
      .max(2),
    expiration_year: yup
      .string()
      .required('expiration_year required')
      .min(4)
      .max(4)
  })
  .required()
