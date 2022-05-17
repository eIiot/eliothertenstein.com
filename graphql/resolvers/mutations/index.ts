import { createComment, deleteComment, updateComment } from './comment'
import { deletePost, upsertPost } from './post'
import { deleteUser, upsertUser } from './user'
import { requiresAdmin } from '../../helpers/requiresAdmin'
import { requiresUser } from '../../helpers/requiresUser'

export default {
  upsertPost: requiresAdmin(upsertPost),
  deletePost: requiresAdmin(deletePost),
  upsertUser: requiresAdmin(upsertUser),
  deleteUser: requiresUser(deleteUser),
  createComment: requiresUser(createComment),
  updateComment: requiresUser(updateComment),
  deleteComment: requiresUser(deleteComment),
}
