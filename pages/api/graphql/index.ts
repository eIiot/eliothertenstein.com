import context from '../../../graphql/context'
import { schema } from '../../../graphql/schema'
import { ApolloServer } from 'apollo-server-micro'
import Cors from 'micro-cors'
import { PageConfig } from 'next'

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
}

const cors = Cors()

const server = new ApolloServer({
  schema,
  context,
})

const startServer = server.start()

export default cors(async (req, res) => {
  console.log('new request at ' + new Date().toISOString())

  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }

  await startServer

  await server.createHandler({ path: '/api/graphql' })(req, res)
})
