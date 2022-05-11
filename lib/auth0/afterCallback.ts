import getUser from './getUser'
import prisma from '../prisma'

export async function afterCallback(_, __, session) {
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
  } = details
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
