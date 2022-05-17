import { CommentDetailFragment } from '../fragments/comment'
import { gql } from 'apollo-server-micro'

export const GET_COMMENTS = gql`
  query getComments($postId: ID!) {
    comments(postId: $postId) {
      ...CommentDetail
    }
  }
  ${CommentDetailFragment}
`
