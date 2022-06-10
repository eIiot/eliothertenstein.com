// ? Code from Brian Lovin, https://brianlovin.com/

const LRU = require('lru-cache')

const rateLimit = (options) => {
  const tokenCache = new LRU({
    max: parseInt(options.uniqueTokenPerInterval || 500, 10),
    maxAge: parseInt(options.interval || 60000, 10),
  })

  return {
    check: (res, limit, token) =>
      new Promise((resolve, reject) => {
        const tokenCount = tokenCache.get(token) || [0]
        if (tokenCount[0] === 0) {
          tokenCache.set(token, tokenCount)
        }
        tokenCount[0] += 1

        const currentUsage = tokenCount[0]
        const isRateLimited = currentUsage >= parseInt(limit, 10)
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

const withRateLimit = (handler) => async (req, res) => {
  try {
    await limiter.check(res, 1024, 'GRAPHQL_RATE_LIMIT')
    return handler(req, res)
  } catch {
    return res.status(429).json({ error: 'Rate limit exceeded' })
  }
}

export default withRateLimit
