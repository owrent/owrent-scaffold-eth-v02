import Link from "next/link";
import { getUser } from "@civic/auth-web3/nextjs";

/**
 * Server Component Example - Civic Auth Integration
 *
 * This page demonstrates how to access authenticated user information
 * in a Next.js Server Component using Civic Auth's getUser() function.
 *
 * Server Components run on the server and can directly access authentication
 * state without client-side JavaScript.
 */
export default async function ServerExamplePage() {
  // Get authenticated user from server-side session
  const user = await getUser();

  // Handle unauthenticated state
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-base-200">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              Unauthorized
            </h2>
            <p className="text-base-content/70">
              You must be signed in to view this page. Please sign in with your wallet to continue.
            </p>
            <div className="card-actions justify-end mt-4">
              <Link href="/" className="btn btn-primary">
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Display authenticated user information
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Server Component Example</h1>
          <p className="text-base-content/70">This page demonstrates server-side authentication with Civic Auth</p>
        </div>

        {/* Info Alert */}
        <div className="alert alert-info mb-6">
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
            <h3 className="font-bold">Server Component</h3>
            <div className="text-xs">
              This page is rendered on the server using Next.js Server Components. The user data is fetched server-side
              using <code className="bg-base-300 px-1 rounded">getUser()</code>.
            </div>
          </div>
        </div>

        {/* User Information Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Authenticated User Information
            </h2>

            <div className="space-y-4">
              {/* User ID */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">User ID</span>
                </label>
                <div className="bg-base-200 p-3 rounded-lg font-mono text-sm break-all">{user.id}</div>
              </div>

              {/* Wallet Address - Highlighted */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">Wallet Address</span>
                  <span className="label-text-alt badge badge-primary">Primary Identity</span>
                </label>
                <div className="bg-primary/10 border-2 border-primary p-3 rounded-lg font-mono text-sm break-all">
                  {(user as any).walletAddress || (user as any).ethWalletAddress || "N/A"}
                </div>
              </div>

              {/* Name (Optional) */}
              {user.name && (
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Name</span>
                  </label>
                  <div className="bg-base-200 p-3 rounded-lg">{user.name}</div>
                </div>
              )}

              {/* Email (Optional) */}
              {user.email && (
                <div>
                  <label className="label">
                    <span className="label-text font-semibold">Email</span>
                  </label>
                  <div className="bg-base-200 p-3 rounded-lg">{user.email}</div>
                </div>
              )}

              {/* Additional Properties */}
              <div>
                <label className="label">
                  <span className="label-text font-semibold">All User Properties</span>
                </label>
                <div className="bg-base-200 p-3 rounded-lg">
                  <pre className="text-xs overflow-x-auto">{JSON.stringify(user, null, 2)}</pre>
                </div>
              </div>
            </div>

            {/* Server-Side Rendering Badge */}
            <div className="card-actions justify-end mt-6">
              <div className="badge badge-success gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Rendered Server-Side
              </div>
            </div>
          </div>
        </div>

        {/* Implementation Details */}
        <div className="mt-8 p-6 bg-base-200 rounded-lg">
          <h3 className="text-lg font-bold mb-3">Implementation Details</h3>
          <div className="space-y-2 text-sm">
            <p>
              <strong>File:</strong> <code className="bg-base-300 px-2 py-1 rounded">app/server-example/page.tsx</code>
            </p>
            <p>
              <strong>Function:</strong>{" "}
              <code className="bg-base-300 px-2 py-1 rounded">getUser() from @civic/auth-web3/nextjs</code>
            </p>
            <p>
              <strong>Rendering:</strong> Server Component (async function)
            </p>
            <p>
              <strong>Authentication:</strong> Checked server-side before rendering
            </p>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-4 mt-8">
          <Link href="/" className="btn btn-outline">
            ← Back to Home
          </Link>
          <Link href="/profile" className="btn btn-outline">
            View Client Example →
          </Link>
        </div>
      </div>
    </div>
  );
}
