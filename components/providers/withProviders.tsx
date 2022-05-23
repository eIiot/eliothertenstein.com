import Providers from '.'
import { ReactChild, ReactNode } from 'react'

export function withProviders(fn: any) {
  return function withPage(page: ReactNode) {
    // @ts-ignore
    return <Providers pageProps={page.props}>{fn(page)}</Providers>
  }
}
