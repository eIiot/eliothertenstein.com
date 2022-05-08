import { Context } from '../../../context'

export async function createPost(
  parent,
  { title, text, slug, excerpt, featureImage },
  ctx: Context
) {
  const { prisma } = ctx
  const post = await prisma.post.create({
    data: {
      title,
      text,
      slug,
      excerpt,
      featureImage,
    },
  })
  return post
}
