import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("authTokenSmart")?.value;

  const isLoggedIn = !!token;

  let accessLevel: string | null = null;
  let isBusiness = false;

  if (token) {
    try {
      const decoded = JSON.parse(atob(token.split(".")[1])); // se for um JWT
      accessLevel = decoded.accessLevel;
      isBusiness = accessLevel === "Membro" || accessLevel === "Administrador";
    } catch (err) {
      console.error("Erro ao decodificar o token:", err);
    }
  }

  const publicUrls = ["/reset"];
  const pathname = request.nextUrl.pathname;

  if (publicUrls.includes(pathname)) {
    return NextResponse.next();
  }

  const isAuthPage = ["/business/login", "/business/login/singup"].includes(
    pathname
  );
  // const isMemberPage = ["/business/membros"].includes(pathname);
  const isAdminPage = ["/business/admin"].includes(pathname);

  if (!isLoggedIn) {
    if (isAuthPage) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/business/login", request.url));
  }

  if (isLoggedIn) {
    if (isAdminPage && !isBusiness) {
      return NextResponse.redirect(new URL("/business/membros", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/business/:path*"],
};
