import { Context } from '../../../context'

export async function posts(_: any, {}, ctx: Context) {
  const { prisma } = ctx
  const posts = await prisma.post.findMany()
  return posts
}
