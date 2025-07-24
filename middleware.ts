import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/teacher(.*)",
  "/upload(.*)",
  "/results(.*)",
]);

const isPublicRoute = createRouteMatcher([
  "/",
  "/about",
  "/pricing",
  "/teacher-login",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

const isTeacherRoute = createRouteMatcher(["/teacher(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // Allow public routes to be accessed without authentication
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  const { userId, sessionClaims } = await auth();
  
  // Protect routes that require authentication
  if (isProtectedRoute(req)) {
    if (!userId) {
      return auth.redirectToSignIn();
    }
  }
  
  // Check for teacher routes
  if (isTeacherRoute(req) && userId) {
    const userRole = sessionClaims?.metadata?.role || "student";
    
    if (userRole !== "teacher") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }
  
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
