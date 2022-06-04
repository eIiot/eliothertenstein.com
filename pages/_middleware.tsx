import { NextResponse, NextRequest, NextFetchEvent } from 'next/server'
export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const url = req.nextUrl.clone()
  // if (req.nextUrl.pathname === '/posts/edit') {
  //   url.pathname = '/posts/new/edit'
  //   return NextResponse.rewrite(url)
  // }

  return NextResponse.next()
}
