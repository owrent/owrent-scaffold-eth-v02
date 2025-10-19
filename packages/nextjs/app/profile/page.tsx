"use client";

import { useUser } from "@civic/auth-web3/react";
import { EnvelopeIcon, InformationCircleIcon, UserIcon, WalletIcon } from "@heroicons/react/24/outline";
import { CardGlass } from "~~/components/ui";

/**
 * Profile Page
 *
 * Demonstrates the useUser hook from Civic Auth.
 * Shows user information including name, email, and wallet address.
 * Handles loading and unauthenticated states appropriately.
 * Uses CardGlass components with proper spacing and typography hierarchy.
 */
export default function ProfilePage() {
  const { user, isLoading, signIn } = useUser();

  // Loading state while authentication is being checked
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg"></div>
          <p className="mt-4 text-lg">Loading user information...</p>
        </div>
      </div>
    );
  }

  // Unauthenticated state - show sign-in prompt
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <CardGlass className="w-96 p-6">
          <div className="flex flex-col items-center text-center">
            <h2 className="text-2xl font-semibold mb-4">Profile</h2>
            <p className="mb-6">Please sign in to view your profile information.</p>
            <button type="button" onClick={() => signIn()} className="btn btn-primary">
              Sign In with Civic Auth
            </button>
          </div>
        </CardGlass>
      </div>
    );
  }

  // Authenticated state - display user information
  return (
    <main className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="max-w-2xl mx-auto">
        {/* Page Header */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Profile</h1>
          <p className="text-muted-foreground">Manage your account information and connected wallet</p>
        </header>

        {/* User Information Section */}
        <section aria-labelledby="user-info-heading" className="mb-6">
          <CardGlass className="p-6">
            <h2 id="user-info-heading" className="text-2xl font-semibold mb-6">
              User Information
            </h2>

            <div className="space-y-4">
              {/* User ID */}
              <div>
                <label htmlFor="user-id" className="flex items-center gap-2 mb-2 text-sm font-medium">
                  <UserIcon className="w-4 h-4" aria-hidden="true" />
                  <span>User ID</span>
                </label>
                <div id="user-id" className="p-3 bg-muted rounded-lg">
                  <code className="text-sm break-all">{user.id}</code>
                </div>
              </div>

              {/* Name */}
              {user.name && (
                <div>
                  <label htmlFor="user-name" className="flex items-center gap-2 mb-2 text-sm font-medium">
                    <UserIcon className="w-4 h-4" aria-hidden="true" />
                    <span>Name</span>
                  </label>
                  <div id="user-name" className="p-3 bg-muted rounded-lg">
                    <p className="text-base">{user.name}</p>
                  </div>
                </div>
              )}

              {/* Email */}
              {user.email && (
                <div>
                  <label htmlFor="user-email" className="flex items-center gap-2 mb-2 text-sm font-medium">
                    <EnvelopeIcon className="w-4 h-4" aria-hidden="true" />
                    <span>Email</span>
                  </label>
                  <div id="user-email" className="p-3 bg-muted rounded-lg">
                    <p className="text-base">{user.email}</p>
                  </div>
                </div>
              )}

              {/* Wallet Address - Prominently displayed */}
              <div>
                <label htmlFor="wallet-address" className="flex items-center gap-2 mb-2 text-sm font-medium">
                  <WalletIcon className="w-4 h-4" aria-hidden="true" />
                  <span>Wallet Address</span>
                </label>
                <div id="wallet-address" className="p-4 bg-primary/10 border-2 border-primary rounded-lg">
                  <code className="text-base font-mono break-all">{user.walletAddress as string}</code>
                </div>
                <p className="text-sm text-muted-foreground mt-2">This is your connected Web3 wallet address</p>
              </div>

              {/* Additional user properties (if available) */}
              {Object.keys(user).length > 4 && (
                <div className="mt-6">
                  <label htmlFor="additional-props" className="flex items-center gap-2 mb-2 text-sm font-medium">
                    <InformationCircleIcon className="w-4 h-4" aria-hidden="true" />
                    <span>Additional Properties</span>
                  </label>
                  <div id="additional-props" className="p-3 bg-muted rounded-lg overflow-auto">
                    <pre className="text-xs">
                      {JSON.stringify(
                        Object.fromEntries(
                          Object.entries(user).filter(
                            ([key]) => !["id", "name", "email", "walletAddress"].includes(key),
                          ),
                        ),
                        null,
                        2,
                      )}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </CardGlass>
        </section>

        {/* Example usage note */}
        <section aria-labelledby="info-heading">
          <CardGlass className="p-6">
            <div className="flex gap-4">
              <InformationCircleIcon className="shrink-0 w-6 h-6 text-primary" aria-hidden="true" />
              <div>
                <h3 id="info-heading" className="font-semibold mb-2">
                  Example Component
                </h3>
                <p className="text-sm text-muted-foreground">
                  This page demonstrates the <code className="px-1 py-0.5 bg-muted rounded text-xs">useUser</code> hook
                  from Civic Auth. It shows how to access user information, handle loading states, and manage
                  unauthenticated users.
                </p>
              </div>
            </div>
          </CardGlass>
        </section>
      </div>
    </main>
  );
}
