import { NextApiRequest, NextApiResponse } from 'next'

import { ProductProps } from '../../../types'
import { products } from '../../../utils/products'

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ProductProps[]>
) => {
  if (req.method === 'GET') {
    return res.status(200).json(products)
  } else {
    res.setHeader('Allow', 'GET')
    res.status(405).end('Method not allowed')
  }
}
