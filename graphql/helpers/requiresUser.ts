import { Context } from '../context'
import { AuthenticationError } from 'apollo-server-nextjs'

export function requiresUser(fn: any) {
  return function resolve(parent: any, args: any, context: Context) {
    if (context.viewer) {
      return fn(parent, args, context)
    }

    throw new AuthenticationError("You can't do that!")
  }
}
