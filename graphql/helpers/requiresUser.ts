import { Context } from '@apollo/client'
import { AuthenticationError } from 'apollo-server-micro'

export function requiresUser(fn: any) {
  return function resolve(parent: any, args: any, context: Context) {
    console.log('context', context)
    // check if the args.id == the viewer.id
    if (args.id === context.viewer.id || context?.viewer?.isAdmin) {
      return fn(parent, args, context)
    }

    throw new AuthenticationError("You can't do that!")
  }
}
