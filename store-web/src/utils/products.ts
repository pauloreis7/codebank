import { ProductProps } from '../types'

export const products: ProductProps[] = [
  {
    id: 'uuid',
    name: 'test-product01',
    description: 'example desc 01',
    price: 50.5,
    image_url: 'https://source.unsplash.com/random?product,' + Math.random(),
    slug: 'test-product01',
    created_at: '2021-06-06T00:00:00'
  },
  {
    id: 'uuid2',
    name: 'test-product02',
    description: 'example desc 02',
    price: 30.52,
    image_url: 'https://source.unsplash.com/random?product,' + Math.random(),
    slug: 'test-product02',
    created_at: '2021-06-06T00:00:00'
  }
]
