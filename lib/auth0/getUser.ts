import { Octokit } from '@octokit/rest'

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

const getUser = async (username: string) => {
  try {
    // get the user data from the github api
    const response = await octokit.rest.users.getByUsername({
      username: 'eiiot',
    })

    return response.data
  } catch (error) {
    console.error(error)
    return null
  }
}

export default getUser
