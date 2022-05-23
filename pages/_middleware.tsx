import { NextResponse, NextRequest, NextFetchEvent } from 'next/server'
export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  console.log(req.nextUrl.pathname)
  // // redirect /me to /me/settings
  // if (req.nextUrl.pathname === '/me') {
  //   return NextResponse.redirect(`${req.url}/settings`)
  // }

  return NextResponse.next()
}
