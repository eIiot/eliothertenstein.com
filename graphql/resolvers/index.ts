import Mutation from './mutations'
import Query from './queries'
import {
  getCommentAuthor,
  viewerCanDelete,
  viewerCanEdit,
} from './queries/comment'
import { Context } from '../context'
import { User } from '../types.generated'
import { Role } from '@prisma/client'
import { GraphQLDateTime } from 'graphql-iso-date'

export default {
  DateTime: GraphQLDateTime,
  Query,
  Mutation,
  Post: {
    reactionCount: async (
      {
        id,
        _count,
      }: {
        id: string
        _count: {
          reactions: number
          comments: number
        }
      },
      _: any,
      { prisma }: Context
    ) => {
      if (_count?.reactions) return _count.reactions

      const reactions = await prisma.post
        .findUnique({
          where: { id },
        })
        .reactions()

      if (!reactions) return 0

      return reactions.length
    },
    commentCount: async (
      {
        id,
        _count,
      }: {
        id: string
        _count: {
          reactions: number
          comments: number
        }
      },
      _: any,
      { prisma }: Context
    ) => {
      if (_count?.comments) return _count.comments

      const comments = await prisma.post
        .findUnique({
          where: { id },
        })
        .comments()

      if (!comments) return 0

      return comments.length
    },
  },
  User: {
    isAdmin: async ({ id, role }: User) => {
      return role === Role.ADMIN
    },
    isBlocked: async ({ id, role }: User) => {
      return role === Role.BLOCKED
    },
  },
  Comment: {
    author: getCommentAuthor,
    viewerCanEdit: viewerCanEdit,
    viewerCanDelete: viewerCanDelete,
  },
}
