import getUser from './getUser'
import prisma from '../prisma'
import { Session } from '@auth0/nextjs-auth0'

export async function afterCallback(_: any, __: any, session: Session) {
  const { user } = session
  const { sub: id, nickname } = user
  const details = await getUser(nickname)
  const {
    bio: description,
    location,
    name,
    id: githubId,
    login: username,
    avatar_url: avatar,
  } = details as {
    bio: string
    location: string
    name: string
    id: number
    login: string
    avatar_url: string
  }
  try {
    await prisma.user.upsert({
      where: {
        id,
      },
      update: {
        description,
        location,
        avatar,
        name: name || nickname,
      },
      create: {
        id,
        username,
        role: 'USER',
        githubId,
        description,
        location,
        avatar,
        name: name || nickname,
      },
    })

    return session
  } catch (error) {
    console.error(error)
  }
}
