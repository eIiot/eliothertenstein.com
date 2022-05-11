import { Context } from '../../../context'

export async function upsertPost(
  parent,
  { title, content, slug, excerpt, featureImage },
  ctx: Context
) {
  const { prisma } = ctx
  const post = await prisma.post.upsert({
    where: {
      slug,
    },
    update: {
      title,
      content,
      excerpt,
      featureImage,
    },
    create: {
      title,
      content,
      slug,
      excerpt,
      featureImage,
    },
  })
  return post
}
