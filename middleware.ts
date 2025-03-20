import { type NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/suppliers", "/clients"];
const publicRoutes = ["/login", "/"];

const rolePermissions: Record<string, string[]> = {
  "/suppliers": ["Admin", "Superadmin"],
  "/clients": ["Admin", "Superadmin"],
};

export default function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.some(
    (route) => path === route || path.startsWith(`${route}/`)
  );
  const isPublicRoute = publicRoutes.includes(path);

  const token = req.cookies.get("token")?.value;
  const userStr = req.cookies.get("user")?.value;
  let user = null;

  try {
    if (userStr) {
      user = JSON.parse(decodeURIComponent(userStr));
    }
  } catch (error) {
    console.error("Error parsing user data:", error);
  }

  // Verificar acceso a rutas protegidas
  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    // Verificar permisos de rol para la ruta
    const allowedRoles = rolePermissions[path];
    if (allowedRoles && user && !allowedRoles.includes(user.role.name)) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  // Redirigir usuarios autenticados desde rutas públicas
  if (isPublicRoute && token && path === "/login") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
