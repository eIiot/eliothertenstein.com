import { gql } from 'apollo-server-nextjs'

export const ReactionDetailFragment = gql`
  fragment ReactionDetail on Reaction {
    id
    createdAt
  }
`
