import { PostCoreFragment } from '../fragments/post'
import { gql } from 'apollo-server-micro'

export const GET_POSTS = gql`
  query getPosts {
    posts {
      ...PostCore
    }
  }
  ${PostCoreFragment}
`
