import { CivicAuthExample } from "~~/components/CivicAuthExample";

/**
 * Civic Auth Example Page
 *
 * This page demonstrates how to detect and respond to authentication state changes
 * using the useUser hook with useEffect. It shows how to track authentication events
 * and perform actions when users sign in or sign out.
 */
export default function CivicAuthExamplePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Civic Auth Event Handling</h1>
        <p className="text-lg text-base-content/70 mb-8">
          Interactive example demonstrating authentication state change detection
        </p>

        <CivicAuthExample />

        {/* Additional Information */}
        <div className="mt-8 space-y-4">
          <div className="card bg-base-200">
            <div className="card-body">
              <h3 className="card-title text-lg">About This Example</h3>
              <p className="text-sm">
                This example demonstrates how to detect authentication state changes using the <code>useUser</code> hook
                with <code>useEffect</code>. This pattern allows you to execute custom logic when users sign in or sign
                out.
              </p>
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Key Features:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>
                    <strong>Sign-in detection:</strong> Triggered when user successfully authenticates
                  </li>
                  <li>
                    <strong>Sign-out detection:</strong> Triggered when user signs out
                  </li>
                  <li>Event logging to track authentication state changes</li>
                  <li>Real-time display of current authentication status</li>
                  <li>Access to user information including wallet address</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="card bg-base-200">
            <div className="card-body">
              <h3 className="card-title text-lg">Implementation Notes</h3>
              <div className="text-sm space-y-2">
                <p>
                  Authentication state changes are detected using <code>useEffect</code>:
                </p>
                <div className="mockup-code text-xs">
                  <pre data-prefix="1">
                    <code>
                      const {"{"} user {"}"} = useUser();
                    </code>
                  </pre>
                  <pre data-prefix="2">
                    <code>const prevUserRef = useRef(user);</code>
                  </pre>
                  <pre data-prefix="3">
                    <code></code>
                  </pre>
                  <pre data-prefix="4">
                    <code>useEffect(() =&gt; {"{"}</code>
                  </pre>
                  <pre data-prefix="5">
                    <code> if (!prevUserRef.current && user) {"{"}</code>
                  </pre>
                  <pre data-prefix="6">
                    <code> {"//"} User signed in</code>
                  </pre>
                  <pre data-prefix="7">
                    <code> {"}"}</code>
                  </pre>
                  <pre data-prefix="8">
                    <code> if (prevUserRef.current && !user) {"{"}</code>
                  </pre>
                  <pre data-prefix="9">
                    <code> {"//"} User signed out</code>
                  </pre>
                  <pre data-prefix="10">
                    <code> {"}"}</code>
                  </pre>
                  <pre data-prefix="11">
                    <code> prevUserRef.current = user;</code>
                  </pre>
                  <pre data-prefix="12">
                    <code>{"}"}, [user]);</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
