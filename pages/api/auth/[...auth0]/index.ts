import { afterCallback } from '../../../../lib/auth0/afterCallback'
import { handleAuth, handleCallback } from '@auth0/nextjs-auth0'

export default handleAuth({
  async callback(req, res) {
    try {
      await handleCallback(req, res, { afterCallback })
    } catch (error: unknown) {
      res.status(error.status || 500).end(error.message)
    }
  },
})

// export default handleAuth()
