import { gql } from 'apollo-server-micro'

export const PostFragment = gql`
  fragment PostFragment on Post {
    id
    createdAt
    updatedAt
    publishedAt
    slug
    title
    text
    excerpt
    featureImage
  }
`
