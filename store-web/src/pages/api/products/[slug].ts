import { NextApiRequest, NextApiResponse } from 'next'

import { ProductProps } from '../../../types'
import { products } from '../../../utils/products'

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ProductProps | { message: string }>
) => {
  if (req.method === 'GET') {
    const { slug } = req.query

    const checkProductExists = products.find(product => product.slug === slug)

    if (!checkProductExists) {
      return res.status(404).json({ message: 'Product not found!' })
    }

    return res.status(200).json(checkProductExists)
  } else {
    res.setHeader('Allow', 'GET')
    res.status(405).end('Method not allowed')
  }
}
