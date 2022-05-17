import { Context } from '../../../context'

export async function upsertPost(
  _: any,
  {
    title,
    content,
    slug,
    excerpt,
    featureImage,
  }: {
    title: string
    content: string
    slug: string
    excerpt: string
    featureImage: string
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
  return post
}
