import { Context } from '../../../context'

export async function deleteUser(parent, { id }, ctx: Context) {
  const { prisma } = ctx
  const user = await prisma.user.delete({
    where: {
      id,
    },
  })
  return user
}
