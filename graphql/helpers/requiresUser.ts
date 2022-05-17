import { RawContext } from '../context'
import { AuthenticationError } from 'apollo-server-micro'

export function requiresUser(fn: any) {
  return function resolve(parent: any, args: any, context: RawContext) {
    if (context.viewer) {
      return fn(parent, args, context)
    }

    throw new AuthenticationError("You can't do that!")
  }
}
