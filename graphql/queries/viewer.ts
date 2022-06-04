import { UserDetailFragment } from '../fragments/user'
import { gql } from 'apollo-server-nextjs'

export const GET_VIEWER = gql`
  query getViewer {
    viewer {
      ...UserDetail
      isAdmin
      isBlocked
    }
  }
  ${UserDetailFragment}
`
