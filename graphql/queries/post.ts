import { PostFragment } from '../fragments/post'
import { gql } from 'apollo-server-micro'

export const GET_POST = gql`
  query getPost($slug: String!) {
    post(slug: $slug) {
      ...PostFragment
    }
  }
  ${PostFragment}
`
