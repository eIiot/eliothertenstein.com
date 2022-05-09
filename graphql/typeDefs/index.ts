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
    content: String!
    excerpt: String
    featureImage: String
  }

  enum Role {
    BLOCKED
    USER
    ADMIN
  }

  type User {
    id: ID!
    role: Role!
    createdAt: DateTime!
    updatedAt: DateTime!
    username: String!
    githubId: Int!
    email: String
    avatar: String
    description: String
    location: String
    name: String
  }

  type Query {
    posts: [Post]
    post(slug: String!): Post
    user(id: ID!): User
  }

  type Mutation {
    upsertPost(
      id: ID
      slug: String!
      title: String
      content: String
      excerpt: String
      featureImage: String
    ): Post
    deletePost(slug: String!): Post

    upsertUser(
      id: ID!
      role: Role!
      username: String!
      githubId: Int!
      email: String
      avatar: String
      description: String
      location: String
      name: String!
    ): User
    deleteUser(id: String!): User
  }
`
