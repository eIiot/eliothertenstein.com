import { gql } from 'apollo-server-micro'

export default gql`
  scalar DateTime

  type Post {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    publishedAt: DateTime
    slug: String!
    title: String!
    text: String!
    excerpt: String
    featureImage: String
  }

  type Query {
    posts: [Post]
    post(slug: String!): Post
  }

  type Mutation {
    createPost(
      title: String!
      text: String!
      slug: String!
      excerpt: String
      featureImage: String
    ): Post
    updatePost(
      title: String
      text: String
      slug: String!
      excerpt: String
      featureImage: String
    ): Post
    deletePost(slug: String!): Post
  }
`
