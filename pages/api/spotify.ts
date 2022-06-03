import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // fetch the spotify api
    const spotifyResponse = await fetch(
      `https://api.spotify.com/v1/me/player/currently-playing`,
      {
        headers: {
          Authorization: `Bearer ${process.env.SPOTIFY_TOKEN}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )

    const spotifyData = await spotifyResponse.json()

    // send the response
    return res.json(spotifyData)
  } catch (error: any) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
}

export default handler
