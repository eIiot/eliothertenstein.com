import context from '../../../graphql/context'
import withRateLimit from '../../../graphql/helpers/withRateLimit'
import { schema } from '../../../graphql/schema'
import { ApolloServer } from 'apollo-server-nextjs'

const server = new ApolloServer({
  schema,
  context,
})

export default withRateLimit(server.createHandler())

// Disable Next.js body parsing so that Apollo Server can access it entirely
export const config = {
  api: {
    bodyParser: false,
  },
}
