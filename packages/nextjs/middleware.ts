import { authMiddleware } from "@civic/auth-web3/nextjs/middleware";

/**
 * Civic Auth Middleware
 *
 * This middleware protects routes and verifies authentication before page load.
 *
 * If you need to add additional middleware logic, you can chain middlewares like this:
 *
 * import { NextResponse } from "next/server";
 * import type { NextRequest } from "next/server";
 *
 * export default async function middleware(request: NextRequest) {
 *   // Run Civic Auth middleware first
 *   const authResponse = await authMiddleware()(request);
 *   if (authResponse) return authResponse;
 *
 *   // Add your custom middleware logic here
 *   // Example: logging, custom redirects, etc.
 *
 *   return NextResponse.next();
 * }
 */
export default authMiddleware();

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next (Next.js internals)
     * - favicon.ico (favicon file)
     * - sitemap.xml (sitemap file)
     * - robots.txt (robots file)
     * - Static files (images, etc.)
     */
    "/((?!_next|favicon.ico|sitemap.xml|robots.txt|.*\\.jpg|.*\\.png|.*\\.svg|.*\\.gif).*)",
  ],
};
