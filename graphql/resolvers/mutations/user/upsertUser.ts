import { Context } from '../../../context'

export async function upsertUser(
  parent,
  { id, role, username, githubId, email, avatar, description, location, name },
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
