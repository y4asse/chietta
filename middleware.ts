import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(function middleware(req) {})
export const config = {
  matcher: [
    '/mypage/:path*',
    '/latest/category',
    '/settings/:path*',
    '/feeds/create',
    '/feeds/following',
    '/user/create/:id*'
  ]
}
