import { Context } from '@apollo/client'
import { AuthenticationError } from 'apollo-server-nextjs'

export function requiresAdmin(fn: any) {
  return function resolve(parent: any, args: any, context: Context) {
    if (context.viewer?.isAdmin) {
      return fn(parent, args, context)
    }

    throw new AuthenticationError("You can't do that!")
  }
}
