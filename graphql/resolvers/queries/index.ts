import { getComments } from './comment'
import { getPost, getPosts } from './post'
import { getUser } from './user'
import { getViewer } from './viewer'

export default {
  posts: getPosts,
  post: getPost,
  user: getUser,
  comments: getComments,
  viewer: getViewer,
}
