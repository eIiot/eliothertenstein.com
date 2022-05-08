import { Context } from '../../../context'

export async function updatePost(
  parent,
  { title, content, slug, excerpt, featureImage },
  ctx: Context
) {
  const { prisma } = ctx
  const post = await prisma.post.update({
    where: {
      slug,
    },
    data: {
      title,
      content,
      slug,
      excerpt,
      featureImage,
    },
  })
  return post
}
