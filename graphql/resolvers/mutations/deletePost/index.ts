import { Context } from '../../../context'

export async function deletePost(parent, { slug }, ctx: Context) {
  const { prisma } = ctx
  const post = await prisma.post.delete({
    where: {
      slug,
    },
  })
  return post
}
