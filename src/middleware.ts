export { default } from "next-auth/middleware"

export const config = {
   matcher: ['/review', '/indetail/:path*', '/settings']
}