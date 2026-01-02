import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
)

export const config = {
  matcher: [
    "/admin/dashboard/:path*",
    "/admin/destinasi/:path*",
    "/admin/event/:path*",
    "/admin/galeri/:path*",
    "/admin/kuliner/:path*",
    "/admin/informasi/:path*",
    "/admin/settings/:path*",
    "/admin/berita/:path*",
    "/admin/ukm/:path*",
  ],
}
