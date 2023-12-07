import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(function middleware(req) {
  const { pathname } = req.nextUrl

  //   console.log(req.nextauth.token)
  //   // 管理者権限のないユーザーが管理者権限が必要なパスにアクセスした場合は404
  //   if (req.nextauth.token === null) {
  //     return NextResponse.rewrite(new URL('/404', req.url))
  //   }
})

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/mypage/:path*', '/latest/category', '/settings/:path*', '/feeds/create']
}
