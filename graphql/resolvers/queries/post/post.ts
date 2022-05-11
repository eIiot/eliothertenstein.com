import { Context } from '../../../context'
import { QueryPostArgs } from '../../../types.generated'

export async function post(_: any, args: QueryPostArgs, ctx: Context) {
  const { slug } = args
  const { prisma } = ctx
  const post = await prisma.post.findUnique({
    where: {
      slug,
    },
  })
  return post
}
