import { CommentDetailFragment } from '../fragments/comment'
import { gql } from 'apollo-server-nextjs'

export const CREATE_COMMENT = gql`
  mutation createComment($content: String!, $postId: String!) {
    createComment(content: $content, postId: $postId) {
      ...CommentDetail
    }
  }
  ${CommentDetailFragment}
`

export const UPDATE_COMMENT = gql`
  mutation updateComment($content: String!, $id: String!) {
    updateComment(content: $content, id: $id) {
      ...CommentDetail
    }
  }
  ${CommentDetailFragment}
`

export const DELETE_COMMENT = gql`
  mutation deleteComment($id: String!) {
    deleteComment(id: $id)
  }
  ${CommentDetailFragment}
`
