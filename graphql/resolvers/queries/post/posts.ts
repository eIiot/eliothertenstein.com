import { Context } from '../../../context'
import moment from 'moment'

export async function posts(_: any, {}, ctx: Context) {
  const { prisma } = ctx
  const posts = await prisma.post.findMany({
    orderBy: [
      {
        createdAt: 'desc',
      },
    ],
  })
  // sort posts by createdAt (most recent first)
  return posts.sort((a, b) => moment(b.createdAt).diff(moment(a.createdAt)))
}
