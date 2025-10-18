"use client";

import { useUser } from "@civic/auth-web3/react";

/**
 * Profile Page
 *
 * Demonstrates the useUser hook from Civic Auth.
 * Shows user information including name, email, and wallet address.
 * Handles loading and unauthenticated states appropriately.
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
        <div className="card w-96 bg-base-200 shadow-xl">
          <div className="card-body items-center text-center">
            <h2 className="card-title text-2xl mb-4">Profile</h2>
            <p className="mb-6">Please sign in to view your profile information.</p>
            <button type="button" onClick={() => signIn()} className="btn btn-primary">
              Sign In with Civic Auth
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated state - display user information
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Profile</h1>

        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6">User Information</h2>

            {/* User ID */}
            <div className="mb-4">
              <label className="label">
                <span className="label-text font-semibold">User ID</span>
              </label>
              <div className="p-3 bg-base-300 rounded-lg">
                <code className="text-sm">{user.id}</code>
              </div>
            </div>

            {/* Name */}
            {user.name && (
              <div className="mb-4">
                <label className="label">
                  <span className="label-text font-semibold">Name</span>
                </label>
                <div className="p-3 bg-base-300 rounded-lg">
                  <p className="text-lg">{user.name}</p>
                </div>
              </div>
            )}

            {/* Email */}
            {user.email && (
              <div className="mb-4">
                <label className="label">
                  <span className="label-text font-semibold">Email</span>
                </label>
                <div className="p-3 bg-base-300 rounded-lg">
                  <p className="text-lg">{user.email}</p>
                </div>
              </div>
            )}

            {/* Wallet Address - Prominently displayed */}
            <div className="mb-4">
              <label className="label">
                <span className="label-text font-semibold">Wallet Address</span>
              </label>
              <div className="p-4 bg-primary/10 border-2 border-primary rounded-lg">
                <code className="text-lg font-mono break-all">{user.walletAddress as string}</code>
              </div>
              <label className="label">
                <span className="label-text-alt">This is your connected Web3 wallet address</span>
              </label>
            </div>

            {/* Additional user properties (if available) */}
            {Object.keys(user).length > 4 && (
              <div className="mt-6">
                <label className="label">
                  <span className="label-text font-semibold">Additional Properties</span>
                </label>
                <div className="p-3 bg-base-300 rounded-lg">
                  <pre className="text-xs overflow-auto">
                    {JSON.stringify(
                      Object.fromEntries(
                        Object.entries(user).filter(([key]) => !["id", "name", "email", "walletAddress"].includes(key)),
                      ),
                      null,
                      2,
                    )}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Example usage note */}
        <div className="alert alert-info mt-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <div>
            <h3 className="font-bold">Example Component</h3>
            <div className="text-sm">
              This page demonstrates the <code>useUser</code> hook from Civic Auth. It shows how to access user
              information, handle loading states, and manage unauthenticated users.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
