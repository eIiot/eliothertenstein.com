import { Context } from '../../../context'
import { QueryCommentsArgs } from '../../../types.generated'

export async function getComments(
  _: any,
  args: QueryCommentsArgs,
  ctx: Context
) {
  const { postId } = args
  const { prisma } = ctx
  const comments = await prisma.post
    .findUnique({
      where: {
        id: postId,
      },
    })
    .comments()

  // order by createdAt
  return comments.sort((a, b) => {
    return a.createdAt.getTime() - b.createdAt.getTime()
  })
}

export async function getCommentAuthor(parent: any, _: any, ctx: Context) {
  const { id } = parent
  const { prisma } = ctx

  const author = await prisma.comment
    .findUnique({
      where: {
        id,
      },
    })
    .author()

  return author
}

export function viewerCanEdit(parent: any, _: any, ctx: Context) {
  const { viewer } = ctx
  const { userId } = parent

  return viewer.id === userId
}

export function viewerCanDelete(parent: any, _: any, ctx: Context) {
  const { viewer } = ctx
  const { userId } = parent

  return viewer.id === userId || viewer.isAdmin
}
