import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const fakeProducts = [
  {
    name: 'Television',
    description: 'Example television description',
    price: '200.00',
    image_url:
      'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Cell phone',
    description: 'Example cell phone description',
    price: '600.00',
    image_url:
      'https://images.unsplash.com/photo-1570891836654-d4961a7b6929?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Wristwatch',
    description: 'Example wristwatch description',
    price: '150.00',
    image_url:
      'https://images.unsplash.com/photo-1584378687113-8739c327634c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Earphones',
    description: 'Example earphones description',
    price: '40.00',
    image_url:
      'https://images.unsplash.com/photo-1578319439584-104c94d37305?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
  },
  {
    name: 'Laptop',
    description: 'Example laptop description',
    price: '900.00',
    image_url:
      'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1332&q=80'
  }
]

async function main() {
  await prisma.product.createMany({
    data: fakeProducts
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async error => {
    console.error(error)

    await prisma.$disconnect()

    process.exit(1)
  })
