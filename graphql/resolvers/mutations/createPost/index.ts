import { Context } from '../../../context'

export async function createPost(
  parent,
  { title, content, slug, excerpt, featureImage },
  ctx: Context
) {
  const { prisma } = ctx
  const post = await prisma.post.create({
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
