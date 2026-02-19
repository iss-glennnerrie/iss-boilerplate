import { NextResponse, NextRequest } from "@/node_modules/next/server";

const protectedRoutes = ["/applications", "/dashboard"];
const authRoutes = ["/login"];

export default async function middleware(req: NextRequest) {
    
    const path = req.nextUrl.pathname;
    const cookie = req.cookies.get("token")?.value;

    const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));
    const isAuthRoute = authRoutes.includes(path);

    // If user tries to access a protected route but is NOT logged in → redirect to /login
    if (isProtectedRoute && !cookie) {
        return NextResponse.redirect(new URL("/login", req.nextUrl));
    }

    //  If user is logged in and tries to access login page → redirect to /dashboard
    if (isAuthRoute && cookie) {
        return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }

    return NextResponse.next();
}

// Avoid running middleware on static files, API routes, and Next internals
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};