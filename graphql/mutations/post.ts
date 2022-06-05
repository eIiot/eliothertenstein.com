import { PostCoreFragment } from '../fragments/post'
import { gql } from 'apollo-server-nextjs'

export const UPSERT_POST = gql`
  mutation upsertPost(
    $title: String
    $content: String
    $slug: String!
    $excerpt: String
    $featureImage: String
    $publishedAt: DateTime
  ) {
    upsertPost(
      title: $title
      content: $content
      slug: $slug
      excerpt: $excerpt
      featureImage: $featureImage
      publishedAt: $publishedAt
    ) {
      ...PostCore
    }
  }
  ${PostCoreFragment}
`

export const DELETE_POST = gql`
  mutation deletePost($slug: String!) {
    deletePost(slug: $slug)
  }
  ${PostCoreFragment}
`
