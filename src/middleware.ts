import { withAuth, NextRequestWithAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(request: NextRequestWithAuth){
    
    if(request.nextUrl.pathname.startsWith("/app/admin") && request.nextauth.token?.role !== "ADMIN")
    {
      return NextResponse.rewrite(new URL("/app/access-denied", request.url))
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token
    }
  }
)

export const config = {
  matcher: [
    '/app',
    '/app/:path*'
  ]
}