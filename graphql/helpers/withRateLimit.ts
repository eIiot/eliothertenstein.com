// ? Code from Brian Lovin, https://brianlovin.com/

import LRU from 'lru-cache'
import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from 'next/server'

// @ts-expect-error FIXME
const rateLimit = (options) => {
  const tokenCache = new LRU({
    max: parseInt(options.uniqueTokenPerInterval || 500, 10),
    maxAge: parseInt(options.interval || 60000, 10),
  })

  return {
    check: (res: NextApiResponse, limit: number, token: string) =>
      new Promise((resolve, reject) => {
        const tokenCount =
          (tokenCache.get(token) as number[]) || ([0] as number[])

        if (tokenCount[0] === 0) {
          tokenCache.set(token, tokenCount)
        }

        tokenCount[0] += 1

        const currentUsage = tokenCount[0]
        const isRateLimited = currentUsage >= limit
        res.setHeader('X-RateLimit-Limit', limit)
        res.setHeader(
          'X-RateLimit-Remaining',
          isRateLimited ? 0 : limit - currentUsage
        )

        return isRateLimited ? reject() : resolve(null)
      }),
  }
}

const limiter = rateLimit({
  interval: 10 * 1000, // 10 seconds
  uniqueTokenPerInterval: 500,
})

const withRateLimit =
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await limiter.check(res, 1024, 'GRAPHQL_RATE_LIMIT')
      return handler(req, res)
    } catch {
      return res.status(429).json({ error: 'Rate limit exceeded' })
    }
  }

export default withRateLimit
