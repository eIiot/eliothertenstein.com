import { createComment, deleteComment, updateComment } from './comment'
import { deletePost, upsertPost } from './post'
import { deleteUser, upsertUser } from './user'
import { requiresAdmin } from '../../helpers/requiresAdmin'
import { requiresUnblocked } from '../../helpers/requiresUnblocked'
import { requiresUser } from '../../helpers/requiresUser'

export default {
  upsertPost: requiresAdmin(upsertPost),
  deletePost: requiresAdmin(deletePost),
  upsertUser: requiresAdmin(upsertUser),
  deleteUser: requiresUser(deleteUser),
  createComment: requiresUnblocked(createComment),
  updateComment: requiresUnblocked(updateComment),
  deleteComment: requiresUser(deleteComment),
}
