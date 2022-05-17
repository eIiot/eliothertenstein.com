import { UserDetailFragment } from '../fragments/user'
import { gql } from 'apollo-server-micro'

export const GET_USER = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      ...UserDetail
    }
  }
  ${UserDetailFragment}
`
