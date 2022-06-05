import { Context } from '../../../context'

export async function upsertPost(
  _: any,
  {
    title,
    content,
    slug,
    excerpt,
    featureImage,
    publishedAt,
  }: {
    title: string
    content: string
    slug: string
    excerpt: string
    featureImage: string
    publishedAt: string
  },
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
      publishedAt,
    },
    create: {
      title,
      content,
      slug,
      excerpt,
      featureImage,
      publishedAt,
    },
  })
  return post
}

export async function deletePost(
  _: any,
  { slug }: { slug: string },
  ctx: Context
) {
  const { prisma } = ctx
  const post = await prisma.post.delete({
    where: {
      slug,
    },
  })
  if (!post) {
    throw new Error('Post not found')
  }
  return true
}
