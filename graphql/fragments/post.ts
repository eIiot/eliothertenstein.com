import { gql } from 'apollo-server-nextjs'

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
