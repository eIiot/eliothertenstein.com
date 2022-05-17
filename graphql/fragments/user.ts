import { gql } from 'apollo-server-micro'

export const UserDetailFragment = gql`
  fragment UserDetail on User {
    id
    role
    createdAt
    username
    githubId
    name
    avatar
  }
`
