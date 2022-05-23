// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({ errorFormat: 'pretty' })
} else {
  // @ts-ignore
  if (!global.prisma) {
    // @ts-ignore
    global.prisma = new PrismaClient({ errorFormat: 'pretty' })
  }
  // @ts-ignore
  prisma = global.prisma
}

export default prisma
