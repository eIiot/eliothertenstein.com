import prisma from '../../lib/prisma'
import { User } from '../types.generated'
import { getSession } from '@auth0/nextjs-auth0'
import { PrismaClient, Role } from '@prisma/client'
import { NextContext } from 'apollo-server-nextjs/dist/ApolloServer'
import { NextApiRequest, NextApiResponse } from 'next'

export interface SafeContext {
  prisma: PrismaClient
  viewer: User
}

export interface Context {
  prisma: PrismaClient
  viewer: User | null
}

export async function getViewer(req: NextApiRequest, res: NextApiResponse) {
  const session = getSession(req, res)

  if (!session) return null

  const { user } = session

  let viewer
  if (user) {
    viewer = await prisma.user.findUnique({
      where: { id: user.sub },
    })
  }

  return viewer
    ? {
        ...viewer,
        isAdmin: viewer?.role === Role.ADMIN,
        isBlocked: viewer?.role === Role.BLOCKED,
      }
    : null
}

export async function getContext(req: NextApiRequest, res: NextApiResponse) {
  const viewer = await getViewer(req, res)

  return {
    viewer,
    prisma,
  }
}

export default async function context(ctx: NextContext) {
  return await getContext(ctx.req, ctx.res)
}
