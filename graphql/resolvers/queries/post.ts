import { Context } from '../../context'

export async function post(parent, { slug }, ctx: Context) {
  const { prisma } = ctx
  const post = await prisma.post.findFirst({
    where: {
      slug,
    },
  })
  return post
}
