import { NextApiRequest, NextApiResponse } from 'next'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const url = decodeURIComponent(req.query.url as string)
  fetch(url)
    .then((response) => response.body)
    .then((body) => {
      // @ts-ignore
      body.pipe(res)
    })
}

export default handler
