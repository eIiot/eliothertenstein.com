import { UserDetailFragment } from './user'
import { gql } from 'apollo-server-nextjs'

export const CommentDetailFragment = gql`
  fragment CommentDetail on Comment {
    id
    createdAt
    updatedAt
    content
    userId
    # post
    postId
    author {
      ...UserDetail
    }
    viewerCanEdit
    viewerCanDelete
  }
  ${UserDetailFragment}
`
