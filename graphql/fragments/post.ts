import { gql } from 'apollo-server-micro'

export const PostCoreFragment = gql`
  fragment PostCore on Post {
    id
    createdAt
    updatedAt
    publishedAt
    slug
    title
    content
    excerpt
    featureImage
    reactionCount
    commentCount
  }
`
