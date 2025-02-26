import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
//   const token = req.cookies.get("token")?.value; // Get token from cookies
//   console.log("token",token);
//   const protectedRoutes = ["/"]; // Add protected pages

//   if (!token && protectedRoutes.includes(req.nextUrl.pathname)) {
//     return NextResponse.redirect(new URL("/signin", req.url)); // Redirect to login
//   }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"], // Apply middleware only to protected routes
};
