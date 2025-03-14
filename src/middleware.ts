import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/app/lib/session";

const protectedRoutes = ["/dashboard"];
const publicRoutes = ["/login"];


export default async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  
  const path = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const refreshToken = cookieStore.get("refresh_token")?.value;
  const session = await decrypt(refreshToken);

  if (isProtectedRoute && !session?.iss) {
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  if (isPublicRoute && session?.iss) {
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
  }

  return NextResponse.next();
}