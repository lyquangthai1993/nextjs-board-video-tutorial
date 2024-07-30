"use client";

import {Loading} from '@/components/auth/loading';
import {ClerkLoading, ClerkProvider, SignedIn, SignedOut, SignInButton, SignOutButton, useAuth} from '@clerk/nextjs';
import {ConvexReactClient} from 'convex/react';
import {ConvexProviderWithClerk} from 'convex/react-clerk';

interface ConvexClientProviderProps {
  children: React.ReactNode;
}

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;
// const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!;
const convex = new ConvexReactClient(convexUrl);

export const ConvexClientProvider = ({
  children
}: ConvexClientProviderProps) => {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <SignedIn>
          {children}
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <ClerkLoading>
          <Loading />
        </ClerkLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};
