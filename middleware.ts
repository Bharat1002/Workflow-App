import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/workflows/(.*)*",
  "/api/webhooks/stripe",
  "/",
]);

export default clerkMiddleware(async (auth, request) => {
  const { userId, redirectToSignIn } = await auth();

  if (!isPublicRoute(request)) {
    if (!userId) {
      return redirectToSignIn();
    }
  }
  if (isPublicRoute(request) && userId) {
    return NextResponse.redirect(new URL("/home", request.url));
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
