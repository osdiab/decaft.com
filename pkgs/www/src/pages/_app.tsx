import { AppComponent } from "next/dist/next-server/lib/router/router";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/clerk-react";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import { Global } from "@emotion/react";
import { globalCss } from "src/styles/global";

// Retrieve Clerk settings from the environment
const clerkFrontendApi = process.env.NEXT_PUBLIC_CLERK_FRONTEND_API;

/**
 * List pages you want to be publicly accessible, or leave empty if
 * every page requires authentication. Use this naming strategy:
 *  "/"              for pages/index.js
 *  "/foo"           for pages/foo/index.js
 *  "/foo/bar"       for pages/foo/bar.js
 *  "/foo/[...bar]"  for pages/foo/[...bar].js
 */
const publicPages = new Set([
  "/log-in/[[...index]]",
  "/sign-up/[[...index]]",
  "/",
]);

const MyApp: AppComponent = ({ Component, pageProps }) => {
  const router = useRouter();
  /**
   * If the current route is listed as public, render it directly.
   * Otherwise, use Clerk to require authentication.
   */
  return (
    <>
      <Global styles={globalCss} />
      <ClerkProvider
        frontendApi={clerkFrontendApi}
        navigate={(to) => router.push(to)}
      >
        {publicPages.has(router.pathname) ? (
          <Component {...pageProps} />
        ) : (
          <>
            <SignedIn>
              <Component {...pageProps} />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
        )}
      </ClerkProvider>
    </>
  );
};

function RedirectToSignIn() {
  useEffect(() => {
    window.location.href = "/log-in";
  });
  return null;
}

export default MyApp;
