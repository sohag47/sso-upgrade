import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Publicly accessible routes
const PUBLIC_ROUTES = [
  "/login",
  "/forget-password",
  "/reset-password",
  "/data/students.json", // Explicitly allow static JSON
];

export function proxy(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;

  // Sanitize path to handle trailing slashes (e.g., "/login/" -> "/login")
  const normalizedPath =
    pathname.endsWith("/") && pathname.length > 1 ? pathname.slice(0, -1) : pathname;

  // Check exact matches or match any file inside /data/
  const isPublicRoute =
    PUBLIC_ROUTES.includes(normalizedPath) || normalizedPath.startsWith("/data/");

  // 1. Unauthenticated user trying to access a protected route -> redirect to /login
  if (!token && !isPublicRoute) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("from", pathname); // Optional: preserve original path
    return NextResponse.redirect(loginUrl);
  }

  // 2. Authenticated user trying to access a public auth page -> redirect to dashboard
  // Exclude data endpoints so logged-in users can still request JSON
  const isAuthPage = ["/login", "/forget-password", "/reset-password"].includes(normalizedPath);
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - data (public static data folder)
     * - favicon.ico, sitemap.xml, robots.txt
     * - Common static media/asset files
     */
    "/((?!_next/static|_next/image|data|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:png|jpg|jpeg|gif|svg|webp|ico|css|js|json)$).*)",
  ],
};
