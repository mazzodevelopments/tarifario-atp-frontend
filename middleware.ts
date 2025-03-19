import { type NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/suppliers", "/clients"];
const publicRoutes = ["/login", "/"];

export default function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some(
    (route) => path === route || path.startsWith(`${route}/`),
  );
  const isPublicRoute = publicRoutes.includes(path);

  const token = req.cookies.get("token")?.value;

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (isPublicRoute && token && path !== "/") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
