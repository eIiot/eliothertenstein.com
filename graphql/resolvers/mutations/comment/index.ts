import { Context } from '../../../context'
import { AuthenticationError } from 'apollo-server-micro'

export async function createComment(
  _: any,
  { postId, content }: { postId: string; content: string; userId: string },
  ctx: Context
) {
  const { prisma, viewer } = ctx
  const comment = prisma.comment.create({
    data: {
      content,
      post: {
        connect: {
          id: postId,
        },
      },
      author: {
        connect: {
          id: viewer.id,
        },
      },
    },
    include: {
      post: true,
    },
  })
  return comment
}

export async function updateComment(
  _: any,
  { id, content }: { id: string; content: string },
  ctx: Context
) {
  const { prisma, viewer } = ctx
  const comment = await prisma.comment.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
    },
  })
  if (!comment) {
    throw new ReferenceError('Comment not found')
  }

  if (comment.author.id !== viewer.id && !viewer.isAdmin) {
    throw new AuthenticationError('You are not allowed to edit this comment')
  }

  const updatedComment = await prisma.comment.update({
    where: {
      id,
    },
    data: {
      content,
    },
  })

  return updatedComment
}

export async function deleteComment(
  _: any,
  { id }: { id: string },
  ctx: Context
) {
  const { prisma, viewer } = ctx

  const comment = await prisma.comment.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
    },
  })

  if (!comment) return true

  if (comment.author.id !== viewer.id && !viewer.isAdmin) {
    throw new AuthenticationError('You are not allowed to delete this comment')
  }

  await prisma.comment.delete({
    where: {
      id: id,
    },
  })

  return true
}
