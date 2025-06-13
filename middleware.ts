import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';

export default clerkMiddleware((auth, req) => {
  // Handle the handshake redirect more efficiently
  if (req.nextUrl.searchParams.has("__clerk_handshake")) {
    const redirectUrl = new URL("/user-page", req.url);
    return NextResponse.redirect(redirectUrl, { status: 307 }); // Use 307 for temporary redirect
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals, static files, and the landing page
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)|^$).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
