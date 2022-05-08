import { getContext } from '../../../graphql/context'
import { schema } from '../../../graphql/schema'
import { ApolloServer, gql } from 'apollo-server-micro'
import Cors from 'micro-cors'
import { PageConfig } from 'next'

const server = new ApolloServer({
  schema,
  context: getContext(),
})

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
}

const cors = Cors()

const startServer = server.start()

export default cors(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }

  await startServer
  await server.createHandler({ path: '/api/graphql' })(req, res)
})
