import { UserDetailFragment } from '../fragments/user'
import { gql } from 'apollo-server-nextjs'

export const UPSERT_USER = gql`
  mutation upsertUser(
    $id: ID!
    $role: Role!
    $username: String!
    $githubId: Int!
    $email: String
    $avatar: String
    $description: String
    $location: String
    $name: String!
  ) {
    upsertUser(
      id: $id
      role: $role
      username: $username
      githubId: $githubId
      email: $email
      avatar: $avatar
      description: $description
      location: $location
      name: $name
    ) {
      ...UserDetail
    }
  }
  ${UserDetailFragment}
`

export const DELETE_USER = gql`
  mutation deleteUser($id: String!) {
    deleteUser(id: $id) {
      ...UserDetail
    }
  }
  ${UserDetailFragment}
`
