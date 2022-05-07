// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({ errorFormat: 'pretty' })
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({ errorFormat: 'pretty' })
  }
  prisma = global.prisma
}

export default prisma
