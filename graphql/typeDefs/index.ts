import { gql } from 'apollo-server-nextjs'

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
    excerpt: String!
    featureImage: String
    reactionCount: Int
    commentCount: Int
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
    username: String!
    githubId: Int!
    name: String!
    email: String
    avatar: String
    description: String
    location: String
    comments: [Comment]
    reactions: [Reaction]
    isAdmin: Boolean
    isBlocked: Boolean
  }

  type Comment {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    content: String!
    author: User!
    userId: String!
    # post: Post!
    postId: String!
    # reactions: [Reaction]
    viewerCanEdit: Boolean!
    viewerCanDelete: Boolean!
  }

  type Reaction {
    id: ID!
    createdAt: DateTime!
    user: User!
    userId: String!
    comment: Comment
    post: Post
    postId: String
  }

  type Query {
    posts: [Post]
    post(slug: String!): Post
    user(id: ID!): User
    comments(postId: ID!): [Comment]
    viewer: User
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
    deletePost(slug: String!): Boolean

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
    deleteUser(id: String!): Boolean

    createComment(content: String!, postId: String!): Comment
    updateComment(content: String!, id: String!): Comment
    deleteComment(id: String!): Boolean
  }
`
