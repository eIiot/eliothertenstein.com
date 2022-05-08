import { PostFragment } from '../fragments/post'
import { gql } from 'apollo-server-micro'

export const CREATE_POST = gql`
  mutation createPost(
    $title: String!
    $content: String!
    $slug: String!
    $excerpt: String
    $featureImage: String
  ) {
    createPost(
      title: $title
      content: $content
      slug: $slug
      excerpt: $excerpt
      featureImage: $featureImage
    ) {
      ...PostFragment
    }
  }
  ${PostFragment}
`

export const UPDATE_POST = gql`
  mutation updatePost(
    $title: String
    $content: String
    $slug: String!
    $excerpt: String
    $featureImage: String
  ) {
    updatePost(
      title: $title
      content: $content
      slug: $slug
      excerpt: $excerpt
      featureImage: $featureImage
    ) {
      ...PostFragment
    }
  }
  ${PostFragment}
`

export const DELETE_POST = gql`
  mutation deletePost($slug: String!) {
    deletePost(slug: $slug) {
      ...PostFragment
    }
  }
  ${PostFragment}
`
