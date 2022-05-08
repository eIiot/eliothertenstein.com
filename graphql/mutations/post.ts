import { PostFragment } from '../fragments/post'
import { gql } from 'apollo-server-micro'

export const CREATE_POST = gql`
  mutation createPost(
    $title: String!
    $text: String!
    $slug: String!
    $excerpt: String
    $featureImage: String
  ) {
    createPost(
      title: $title
      text: $text
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
    $text: String
    $slug: String!
    $excerpt: String
    $featureImage: String
  ) {
    updatePost(
      title: $title
      text: $text
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
