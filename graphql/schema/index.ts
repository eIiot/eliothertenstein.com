import resolvers from '../resolvers'
import typeDefs from '../typeDefs'
import { makeExecutableSchema } from '@graphql-tools/schema'

export const schema = makeExecutableSchema({ typeDefs, resolvers })
