import { Context, SafeContext } from '../../../context'
import { Role } from '../../../types.generated'
import { AuthenticationError } from 'apollo-server-nextjs'

export async function upsertUser(
  _: any,
  {
    id,
    role,
    username,
    githubId,
    email,
    avatar,
    description,
    location,
    name,
  }: {
    id: string
    role: Role
    username: string
    githubId: number
    email: string
    avatar: string
    description: string
    location: string
    name: string
  },
  ctx: Context
) {
  const { prisma } = ctx
  const user = await prisma.user.upsert({
    where: {
      id,
    },
    update: {
      role,
      username,
      githubId,
      email,
      avatar,
      description,
      location,
      name,
    },
    create: {
      id,
      role,
      username,
      githubId,
      email,
      avatar,
      description,
      location,
      name,
    },
  })
  return user
}

export async function deleteUser(
  _: any,
  { id }: { id: string },
  ctx: SafeContext
) {
  const { prisma, viewer } = ctx
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  })

  if (!user) return true

  if (user.id !== viewer.id && !viewer.isAdmin) {
    throw new AuthenticationError('You are not allowed to delete this comment')
  }

  await prisma.user.delete({
    where: {
      id: id,
    },
  })
}
