import { gql } from 'apollo-server-micro'

export const UserFragment = gql`
  fragment UserFragment on User {
    id
    role
    username
    githubId
    email
    avatar
    description
    location
    name
  }
`
