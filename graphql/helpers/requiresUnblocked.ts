import { Context } from '../context'
import { AuthenticationError } from 'apollo-server-nextjs'

export function requiresUnblocked(fn: any) {
  return function resolve(parent: any, args: any, context: Context) {
    if (context.viewer && !context.viewer.isBlocked) {
      return fn(parent, args, context)
    }

    throw new AuthenticationError("You can't do that!")
  }
}
