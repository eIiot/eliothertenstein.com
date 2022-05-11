import getContext from '../../../graphql/context'
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

export default cors(async (req, res) => {
  const server = new ApolloServer({
    schema,
    context: await getContext(req, res),
  })

  const startServer = server.start()

  if (req.method === 'OPTIONS') {
    res.end()
    return false
  }

  await startServer
  await server.createHandler({ path: '/api/graphql' })(req, res)
})
