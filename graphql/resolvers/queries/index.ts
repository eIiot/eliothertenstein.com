import { getComments } from './comment'
import { getPost, getPosts } from './post'
import { getUser } from './user/user'

export default {
  posts: getPosts,
  post: getPost,
  user: getUser,
  comments: getComments,
}
