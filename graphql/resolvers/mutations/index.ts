import { deletePost } from './post/deletePost'
import { upsertPost } from './post/upsertPost'
import { deleteUser } from './user/deleteUser'
import { upsertUser } from './user/upsertUser'
import { requiresAdmin } from '../../helpers/requiresAdmin'

export default {
  upsertPost: requiresAdmin(upsertPost),
  deletePost: requiresAdmin(deletePost),
  upsertUser: requiresAdmin(upsertUser),
  deleteUser: requiresAdmin(deleteUser),
}
