import { Context } from '../../context'

export async function user(parent, { id }, ctx: Context) {
  const { prisma } = ctx
  const user = await prisma.user.findFirst({
    where: {
      id,
    },
  })
  return user
}
