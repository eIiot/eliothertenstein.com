import { Context } from '../../../context'
import { QueryUserArgs } from '../../../types.generated'

export async function user(_: any, args: QueryUserArgs, ctx: Context) {
  const { id } = args
  const { prisma } = ctx
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  })
  return user
}
