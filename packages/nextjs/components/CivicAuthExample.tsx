"use client";

import { useEffect, useRef, useState } from "react";
import { useUser } from "@civic/auth-web3/react";

/**
 * CivicAuthExample Component
 *
 * Demonstrates how to detect and respond to authentication state changes with useUser hook.
 * This component shows how to:
 * - Execute custom logic when a user signs in
 * - Execute custom logic when a user signs out
 * - Track authentication events using useEffect
 * - Perform actions based on authentication state changes
 *
 * Note: Civic Auth's useUser hook doesn't accept callback parameters directly.
 * Instead, we use useEffect to detect changes in the user state and trigger
 * our custom logic accordingly.
 *
 * Usage:
 * ```tsx
 * import { CivicAuthExample } from "~~/components/CivicAuthExample";
 *
 * export default function MyPage() {
 *   return <CivicAuthExample />;
 * }
 * ```
 */
export const CivicAuthExample = () => {
  // Track authentication events for demonstration
  const [events, setEvents] = useState<Array<{ type: string; timestamp: Date; details?: string }>>([]);

  /**
   * handleSignIn Function
   *
   * This function is called when a user successfully signs in (detected via useEffect).
   * Use this to:
   * - Log analytics events
   * - Fetch user-specific data
   * - Initialize user session
   * - Redirect to a specific page
   * - Show welcome notifications
   */
  const handleSignIn = () => {
    // Add event to log
    setEvents(prev => [
      ...prev,
      {
        type: "sign-in",
        timestamp: new Date(),
        details: "User authenticated and wallet connected",
      },
    ]);

    // Example: You could perform additional actions here
    // - Fetch user's deals: fetchUserDeals(user.walletAddress)
    // - Initialize analytics: analytics.identify(user.id)
    // - Show welcome message: notification.success("Welcome back!")
    // - Redirect: router.push("/dashboard")
  };

  /**
   * handleSignOut Function
   *
   * This function is called when a user signs out (detected via useEffect).
   * Use this to:
   * - Clear local state
   * - Log analytics events
   * - Redirect to home page
   * - Show goodbye notifications
   * - Clean up subscriptions
   */
  const handleSignOut = () => {
    // Add event to log
    setEvents(prev => [
      ...prev,
      {
        type: "sign-out",
        timestamp: new Date(),
        details: "User disconnected wallet and signed out",
      },
    ]);

    // Example: You could perform additional actions here
    // - Clear cached data: clearUserCache()
    // - Log analytics: analytics.track("User Signed Out")
    // - Show message: notification.info("You've been signed out")
    // - Redirect: router.push("/")
  };

  // Use the useUser hook
  // Note: Civic Auth doesn't support onSignIn/onSignOut callbacks directly in useUser
  // Instead, we use useEffect to detect authentication state changes
  const { user, signIn, signOut, isLoading } = useUser();

  // Track previous user state to detect sign-in/sign-out events
  const prevUserRef = useRef(user);

  useEffect(() => {
    const prevUser = prevUserRef.current;
    const currentUser = user;

    // Detect sign-in event (was null/undefined, now has user)
    if (!prevUser && currentUser) {
      handleSignIn();
    }

    // Detect sign-out event (had user, now null/undefined)
    if (prevUser && !currentUser) {
      handleSignOut();
    }

    // Update ref for next comparison
    prevUserRef.current = currentUser;
  }, [user]);

  return (
    <div className="card bg-base-200 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-2xl mb-4">Civic Auth Callbacks Example</h2>

        {/* Current Authentication State */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Current State:</h3>
          <div className="p-4 bg-base-300 rounded-lg">
            {isLoading ? (
              <div className="flex items-center gap-2">
                <span className="loading loading-spinner loading-sm"></span>
                <span>Checking authentication...</span>
              </div>
            ) : user ? (
              <div>
                <p className="mb-2">
                  <span className="badge badge-success">Authenticated</span>
                </p>
                <p className="text-sm">
                  <strong>User ID:</strong> {user.id}
                </p>
                {user.name && (
                  <p className="text-sm">
                    <strong>Name:</strong> {user.name}
                  </p>
                )}
                <p className="text-sm">
                  <strong>Wallet:</strong> <code className="text-xs">{user.walletAddress as string}</code>
                </p>
              </div>
            ) : (
              <p>
                <span className="badge badge-warning">Not Authenticated</span>
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Actions:</h3>
          <div className="flex gap-2">
            {user ? (
              <button type="button" onClick={() => signOut()} className="btn btn-error">
                Sign Out
              </button>
            ) : (
              <button type="button" onClick={() => signIn()} className="btn btn-primary">
                Sign In
              </button>
            )}
          </div>
        </div>

        {/* Event Log */}
        <div>
          <h3 className="font-semibold mb-2">Event Log:</h3>
          <div className="p-4 bg-base-300 rounded-lg max-h-64 overflow-y-auto">
            {events.length === 0 ? (
              <p className="text-sm text-base-content/60">No events yet. Sign in or sign out to see callback events.</p>
            ) : (
              <div className="space-y-2">
                {events.map((event, index) => (
                  <div key={index} className="p-2 bg-base-100 rounded">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`badge badge-sm ${event.type === "sign-in" ? "badge-success" : "badge-error"}`}>
                        {event.type}
                      </span>
                      <span className="text-xs text-base-content/60">{event.timestamp.toLocaleTimeString()}</span>
                    </div>
                    {event.details && <p className="text-xs">{event.details}</p>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Documentation */}
        <div className="alert alert-info mt-4">
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
          <div className="text-sm">
            <h4 className="font-bold">Authentication Event Handling</h4>
            <p className="mt-1">
              This component uses <code>useEffect</code> to detect authentication state changes and trigger custom
              logic. Check the browser console and event log above to see the events in action.
            </p>
            <div className="mt-2">
              <p className="font-semibold">Common use cases:</p>
              <ul className="list-disc list-inside ml-2 mt-1">
                <li>Fetch user-specific data after sign-in</li>
                <li>Clear cached data on sign-out</li>
                <li>Track analytics events</li>
                <li>Show notifications</li>
                <li>Redirect users to specific pages</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="mt-4">
          <details className="collapse collapse-arrow bg-base-300">
            <summary className="collapse-title font-semibold">View Code Example</summary>
            <div className="collapse-content">
              <pre className="text-xs overflow-auto p-4 bg-base-100 rounded mt-2">
                {`const { user, signIn, signOut } = useUser();
const prevUserRef = useRef(user);

useEffect(() => {
  const prevUser = prevUserRef.current;
  
  // Detect sign-in
  if (!prevUser && user) {
    // Fetch user data
    // Show welcome notification
  }
  
  // Detect sign-out
  if (prevUser && !user) {
    // Clear cached data
    // Show goodbye message
  }
  
  prevUserRef.current = user;
}, [user]);`}
              </pre>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};
