import { NextResponse, NextRequest, NextFetchEvent } from 'next/server'
import { url } from 'inspector'
export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const url = req.nextUrl
  const { pathname } = url
  if (pathname == '/me/settings') {
    url.pathname = '/me/settings/tab1'
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}
