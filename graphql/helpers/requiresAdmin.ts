import { Context } from '@apollo/client'
import { AuthenticationError } from 'apollo-server-micro'

export function requiresAdmin(fn: any) {
  return function resolve(parent: any, args: any, context: Context) {
    console.log('context', context)
    if (context?.viewer?.isAdmin) {
      return fn(parent, args, context)
    }

    throw new AuthenticationError("You can't do that!")
  }
}
