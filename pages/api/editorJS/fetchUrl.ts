import urlParser from 'html-metadata-parser'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  let url = req.query.url as string
  // get the resulting meta data
  urlParser(url)
    .then((result) => {
      res.status(200).json({
        success: 1,
        url: result.meta.url || '',
        meta: {
          title: result.meta.title,
          description: result.meta.description,
          image: result.meta.image || result.og.image,
        },
      })
    })
    .catch(() => {
      res.status(401).json({ success: 0 })
    })
}

export default handler
