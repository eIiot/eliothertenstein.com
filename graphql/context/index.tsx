import prisma from '../../lib/prisma'
import { PrismaClient } from '@prisma/client'

export interface Context {
  prisma: PrismaClient
}

export function getContext(): Context {
  return {
    prisma,
  }
}

export default function context() {
  return getContext()
}
