import prisma from '../../lib/prisma'

const handler = async (req, res) => {
  const feed = await prisma.post.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  res.json(feed)
}

export default handler
