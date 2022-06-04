import prisma from '../../../lib/prisma'
import { withApiAuthRequired, getSession, Session } from '@auth0/nextjs-auth0'
import { NextApiRequest, NextApiResponse } from 'next'

export default withApiAuthRequired(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const getIsAuthenticated = async (
      res: NextApiResponse,
      req: NextApiRequest
    ) => {
      const { user: viewer } = getSession(req, res) as Session
      return viewer
    }

    const getIsAdmin = async (res: NextApiResponse, req: NextApiRequest) => {
      const viewer = await getIsAuthenticated(res, req)
      const user = await prisma.user.findUnique({
        where: {
          id: viewer.sub,
        },
      })
      return user?.role === 'ADMIN'
    }

    const isAdmin = await getIsAdmin(res, req)

    if (!isAdmin) {
      return res.status(401).json({ uploadURL: null })
    }

    const CLOUDFLARE_URL = `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v2/direct_upload?requireSignedUrls=true&metadata={"key":"value"}`
    const headers = {
      Authorization: `Bearer ${process.env.CLOUDFLARE_IMAGES_KEY}`,
    }

    const data = await fetch(CLOUDFLARE_URL, {
      method: 'POST',
      headers,
    })
      .then((response) => {
        return response.json()
      })
      .catch((err) => {
        return res.status(500).json({ uploadURL: null })
      })

    const { uploadURL } = data.result

    return res.status(200).json({ uploadURL })
  }
)
