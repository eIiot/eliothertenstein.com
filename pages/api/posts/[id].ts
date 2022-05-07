import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

const getPost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  prisma.post
    .findFirst({
      where: {
        id,
      },
    })
    .then(res.json)
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        error: err,
      })
    })
}

// for PUT requests
const updatePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  await prisma.post
    .update({
      where: {
        id,
      },
      data: {
        id,
        ...req.body,
      },
    })
    .then(res.json)
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    )
}

// for POST requests
const createPost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  await prisma.post
    .create({
      data: {
        id,
        ...req.body,
      },
    })
    .then(res.json)
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    )
}

// for DELETE requests
const deletePost = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query
  await prisma.post
    .delete({
      where: {
        id,
      },
    })
    .then(res.json)
    .catch((err) =>
      res.status(500).json({
        error: err,
      })
    )
}

const handeler = (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.query)
  switch (req.method) {
    case 'GET':
      return getPost(req, res)
    case 'PUT':
      return updatePost(req, res)
    case 'POST':
      return createPost(req, res)
    case 'DELETE':
      return deletePost(req, res)
    default:
      return res.status(404).end()
  }
}

export default handeler
