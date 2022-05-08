import Mutation from './mutations'
import Query from './queries'
import { GraphQLDateTime } from 'graphql-iso-date'

export default {
  DateTime: GraphQLDateTime,
  Query,
  Mutation,
}
