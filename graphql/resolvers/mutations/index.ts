import { deletePost } from './post/deletePost'
import { upsertPost } from './post/upsertPost'
import { deleteUser } from './user/deleteUser'
import { upsertUser } from './user/upsertUser'
import { requiresAdmin } from '../../helpers/requiresAdmin'
import { requiresUser } from '../../helpers/requiresUser'

export default {
  upsertPost: requiresAdmin(upsertPost),
  deletePost: requiresAdmin(deletePost),
  upsertUser: requiresAdmin(upsertUser),
  deleteUser: requiresUser(deleteUser),
}
