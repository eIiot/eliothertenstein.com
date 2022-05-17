import { gql } from 'apollo-server-micro'

export const ReactionDetailFragment = gql`
  fragment ReactionDetail on Reaction {
    id
    createdAt
  }
`
