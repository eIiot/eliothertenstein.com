import { Context } from '../../../context'
import { Role } from '../../../types.generated'

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

export async function deleteUser(_: any, { id }: { id: string }, ctx: Context) {
  const { prisma } = ctx
  const user = await prisma.user.delete({
    where: {
      id,
    },
  })
  return user
}
