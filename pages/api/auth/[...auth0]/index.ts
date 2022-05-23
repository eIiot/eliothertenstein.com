import { afterCallback } from '../../../../lib/auth0/afterCallback'
import { handleAuth, handleCallback, RequestError } from '@auth0/nextjs-auth0'

export default handleAuth({
  async callback(req, res) {
    try {
      await handleCallback(req, res, { afterCallback })
    } catch (error: any) {
      res.status(error.status || 500).end(error.message)
    }
  },
})
