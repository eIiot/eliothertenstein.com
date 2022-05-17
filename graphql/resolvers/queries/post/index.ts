import { Context } from '../../../context'
import { QueryPostArgs } from '../../../types.generated'
import moment from 'moment'

export async function getPost(_: any, args: QueryPostArgs, ctx: Context) {
  const { slug } = args
  const { prisma } = ctx
  const post = await prisma.post.findUnique({
    where: {
      slug,
    },
    include: {
      _count: {
        select: {
          reactions: true,
          comments: true,
        },
      },
    },
  })
  return post
}

export async function getPosts(_: any, __: any, ctx: Context) {
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
