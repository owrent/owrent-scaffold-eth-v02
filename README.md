# 🏗 Scaffold-ETH 2 ZAMA template

<h4 align="center">
  <a href="https://docs.scaffoldeth.io">ScaffoldETH docs</a> |
  <a href="https://scaffoldeth.io">Website</a>
  <br>
  <a href="https://docs.zama.ai/homepage/">ZAMA docs</a> |
  <a href="https://www.zama.ai/">Website</a>
</h4>

🧪 An open-source, up-to-date toolkit for building decentralized applications (dapps) on the Ethereum blockchain with confidential transactions support. This Scaffold-ETH 2 ZAMA template is designed to make it easier for developers to create and deploy smart contracts with privacy-preserving capabilities and build user interfaces that interact with those contracts.

⚙️ Built using NextJS, **FHEVM**, Civic Auth, Hardhat, Wagmi, Viem, and Typescript.

- ✅ **Contract Hot Reload**: Your frontend auto-adapts to your smart contract as you edit it.
- 🪝 **[Custom hooks](https://docs.scaffoldeth.io/hooks/)**: Collection of React hooks wrapper around [wagmi](https://wagmi.sh/) to simplify interactions with smart contracts with typescript autocompletion.
- 🧱 [**Components**](https://docs.scaffoldeth.io/components/): Collection of common web3 components to quickly build your frontend.
- 🔥 **Burner Wallet & Local Faucet**: Quickly test your application with a burner wallet and local faucet.
- 🔐 **Integration with Wallet Providers**: Connect to different wallet providers and interact with the Ethereum network.

![Debug Contracts tab](https://github.com/scaffold-eth/scaffold-eth-2/assets/55535804/b237af0c-5027-4849-a5c1-2e31495cccb1)

## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v20.18.3)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with Scaffold-ETH 2, follow the steps below:

1. Install dependencies if it was skipped in CLI:

```
cd my-dapp-example
yarn install
```

2. Set up environment variables:

```
cd packages/nextjs
cp .env.example .env.local
```

Edit `.env.local` and add your Civic Auth Client ID:
- Get your Client ID from [https://auth.civic.com](https://auth.civic.com)
- Sign up or log in to the Civic Auth Dashboard
- Create a new application
- Copy the Client ID and paste it in `NEXT_PUBLIC_CIVIC_CLIENT_ID`

> **Note**: The app will work without Civic Auth configured, but wallet authentication will not be available. A warning will be shown in development mode if the Client ID is missing.

3. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `packages/hardhat/hardhat.config.ts`.

4. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

5. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

Run smart contract test with `yarn hardhat:test`

- Edit your smart contracts in `packages/hardhat/contracts`
- Edit your frontend homepage at `packages/nextjs/app/page.tsx`. For guidance on [routing](https://nextjs.org/docs/app/building-your-application/routing/defining-routes) and configuring [pages/layouts](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts) checkout the Next.js documentation.
- Edit your deployment scripts in `packages/hardhat/deploy`

## Civic Auth Integration

This template uses **Civic Auth** for embedded wallet authentication, replacing RainbowKit as the primary authentication mechanism. Civic Auth provides OAuth-based authentication with Web3 wallet integration, enabling users to sign in securely while maintaining their blockchain identity.

### Why Civic Auth?

- **Privacy-Preserving**: OAuth-based authentication with Web3 wallet support
- **Simplified UX**: Single sign-in flow for both authentication and wallet connection
- **Server-Side Support**: Built-in support for server components, API routes, and server actions
- **Secure by Default**: Uses PKCE (Proof Key for Code Exchange) for secure OAuth flow
- **No RainbowKit Dependency**: Lighter bundle size and simpler configuration

### Getting Your Client ID

To use Civic Auth, you need a Client ID from the Civic Auth Dashboard:

1. Visit [https://auth.civic.com](https://auth.civic.com)
2. Sign up or log in to your account
3. Click "Create Application" or "New Project"
4. Fill in your application details:
   - **Name**: Your application name (e.g., "My DApp")
   - **Redirect URLs**: Add your development and production URLs
     - Development: `http://localhost:3000`
     - Production: `https://yourdomain.com`
5. Copy the **Client ID** from the application settings
6. Add it to your `.env.local` file:

```bash
NEXT_PUBLIC_CIVIC_CLIENT_ID=your_client_id_here
```

> **Note**: The app will work without Civic Auth configured, but wallet authentication will not be available. A warning will be shown in development mode if the Client ID is missing.

### Configuration Options

Civic Auth can be customized in `packages/nextjs/next.config.ts`:

```typescript
import { createCivicAuthPlugin } from "@civic/auth-web3/nextjs";

const withCivicAuth = createCivicAuthPlugin({
  // Required: Your Civic Auth Client ID
  clientId: process.env.NEXT_PUBLIC_CIVIC_CLIENT_ID || "",
  
  // Optional: Customize authentication URLs
  loginSuccessUrl: "/dashboard",  // Redirect after successful login (default: "/")
  loginUrl: "/login",              // Custom login page (default: "/")
  logoutUrl: "/",                  // Redirect after logout (default: "/")
  
  // Optional: Base URL for reverse proxy setups
  baseUrl: "https://yourdomain.com",  // Public-facing URL
});

export default withCivicAuth(nextConfig);
```

### Middleware Configuration

The middleware protects routes and verifies authentication. Configure it in `packages/nextjs/middleware.ts`:

```typescript
import { authMiddleware } from "@civic/auth-web3/nextjs/middleware";

export default authMiddleware();

export const config = {
  matcher: [
    // Include: All routes except static assets
    '/((?!_next|favicon.ico|sitemap.xml|robots.txt|.*\\.jpg|.*\\.png|.*\\.svg|.*\\.gif).*)',
    
    // Or specify exact routes to protect:
    // '/dashboard/:path*',
    // '/profile/:path*',
    // '/api/protected/:path*',
  ],
};
```

To exclude specific routes from authentication:

```typescript
export const config = {
  matcher: [
    // Protect all routes except /public and /about
    '/((?!_next|favicon.ico|public|about).*)',
  ],
};
```

### Usage Examples

#### Client-Side: useUser Hook

The `useUser` hook provides access to authentication state and user information:

```typescript
import { useUser } from "@civic/auth-web3/react";

export const MyComponent = () => {
  const { user, signIn, signOut, isLoading } = useUser();
  
  if (isLoading) {
    return <div>Loading...</div>;
  }
  
  if (!user) {
    return (
      <button onClick={signIn}>
        Connect Wallet
      </button>
    );
  }
  
  return (
    <div>
      <p>Welcome, {user.name || "User"}!</p>
      <p>Wallet: {user.walletAddress}</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};
```

**With Callbacks:**

```typescript
const { user } = useUser({
  onSignIn: () => {
    console.log("User signed in!");
    // Refresh data, redirect, show notification, etc.
  },
  onSignOut: () => {
    console.log("User signed out!");
    // Clear state, redirect to home, etc.
  },
});
```

**User Object Properties:**

```typescript
interface User {
  id: string;              // Unique user identifier
  name?: string;           // Display name (if provided)
  email?: string;          // Email address (if provided)
  walletAddress: string;   // Connected Web3 wallet address
  // Additional custom properties...
}
```

#### Server Components: getUser()

Access user information in Next.js Server Components:

```typescript
import { getUser } from "@civic/auth-web3/nextjs";

export default async function ProfilePage() {
  const user = await getUser();
  
  if (!user) {
    return <div>Please sign in to view your profile.</div>;
  }
  
  return (
    <div>
      <h1>Profile</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Wallet: {user.walletAddress}</p>
    </div>
  );
}
```

#### API Routes: getUser()

Protect API routes with authentication:

```typescript
import { getUser } from "@civic/auth-web3/nextjs";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const user = await getUser();
  
  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
  
  // Return user-specific data
  return NextResponse.json({
    userId: user.id,
    walletAddress: user.walletAddress,
    // ... other data
  });
}

export async function POST(request: NextRequest) {
  const user = await getUser();
  
  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
  
  const body = await request.json();
  
  // Process authenticated request
  // ...
  
  return NextResponse.json({ success: true });
}
```

#### Server Actions: getUser()

Use authentication in Server Actions:

```typescript
"use server";

import { getUser } from "@civic/auth-web3/nextjs";

export async function updateUserProfile(formData: FormData) {
  const user = await getUser();
  
  if (!user) {
    throw new Error("Unauthorized");
  }
  
  const name = formData.get("name") as string;
  
  // Update user profile in database
  // ...
  
  return { success: true };
}

export async function getUserData() {
  const user = await getUser();
  
  if (!user) {
    throw new Error("Unauthorized");
  }
  
  return {
    id: user.id,
    name: user.name,
    walletAddress: user.walletAddress,
  };
}
```

### Example Pages

This template includes several example implementations:

#### Profile Page (`/profile`)

Shows how to use the `useUser` hook to:

- Display user information (name, email, wallet address)
- Handle loading states
- Prompt unauthenticated users to sign in

#### Server Component (`/server-example`)

Demonstrates server-side authentication using `getUser()`:

- Fetching user data in Next.js Server Components
- Server-side authentication checks
- Rendering authenticated content without client-side JavaScript

#### API Route (`/api/user`)

Protected API endpoint example showing:

- **GET**: Retrieve authenticated user information
- **POST**: Update user preferences (example)
- **DELETE**: Delete user data (example)
- Returns 401 for unauthenticated requests
- Includes wallet address in all responses
- Structured error handling with error codes

#### Server Actions (`app/actions/userActions.ts`)

Server-side functions demonstrating:

- `getUserData()`: Fetch authenticated user data
- `updateUserPreferences()`: Update user settings
- `createDeal()`: Business logic with authentication
- `submitBid()`: Protected operations
- Error handling with custom error messages

Visit these pages and endpoints after starting your app to see Civic Auth in action.

### Migration from RainbowKit

If you're migrating from RainbowKit, here's what changed:

#### Hook Replacements

| RainbowKit/Wagmi Hook | Civic Auth Equivalent |
|-----------------------|-----------------------|
| `useAccount()` | `useUser()` |
| `useConnect()` | `useUser().signIn()` |
| `useDisconnect()` | `useUser().signOut()` |
| `address` | `user.walletAddress` |
| `isConnected` | `!!user` |
| `isConnecting` | `isLoading` |

#### Before (RainbowKit):

```typescript
import { useAccount, useConnect, useDisconnect } from "wagmi";

const { address, isConnected } = useAccount();
const { connect } = useConnect();
const { disconnect } = useDisconnect();

if (!isConnected) {
  return <button onClick={() => connect()}>Connect</button>;
}

return (
  <div>
    <p>Address: {address}</p>
    <button onClick={() => disconnect()}>Disconnect</button>
  </div>
);
```

#### After (Civic Auth):

```typescript
import { useUser } from "@civic/auth-web3/react";

const { user, signIn, signOut } = useUser();

if (!user) {
  return <button onClick={signIn}>Connect Wallet</button>;
}

return (
  <div>
    <p>Address: {user.walletAddress}</p>
    <button onClick={signOut}>Sign Out</button>
  </div>
);
```

#### Provider Changes

**Before (RainbowKit):**

```typescript
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </body>
    </html>
  );
}
```

**After (Civic Auth):**

```typescript
import { CivicAuthProvider } from "@civic/auth-web3/nextjs";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <CivicAuthProvider>
          {children}
        </CivicAuthProvider>
      </body>
    </html>
  );
}
```

#### Breaking Changes

1. **No separate wallet connection**: Civic Auth combines authentication and wallet connection into a single flow
2. **Different user object structure**: Access wallet address via `user.walletAddress` instead of `address`
3. **Server-side support**: Use `getUser()` instead of client-only hooks for server components
4. **Middleware required**: Add `middleware.ts` to protect routes (not needed with RainbowKit)
5. **Environment variable**: Use `NEXT_PUBLIC_CIVIC_CLIENT_ID` instead of `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID`

### Additional Resources

- **Civic Auth Documentation**: [https://docs.civic.com](https://docs.civic.com)
- **Civic Auth Dashboard**: [https://auth.civic.com](https://auth.civic.com)
- **Civic Auth GitHub**: [https://github.com/civicteam/civic-auth](https://github.com/civicteam/civic-auth)
- **Support**: Contact Civic support through the dashboard or GitHub issues


## Testing Civic Auth Integration

### Automated Testing

We provide comprehensive automated test scripts to verify the Civic Auth integration:

```bash
cd packages/nextjs

# Run all tests at once
./scripts/run-all-tests.sh

# Or run individual test suites:
./scripts/verify-civic-auth.sh        # Basic integration verification
./scripts/integration-test.sh         # Integration testing (requires server)
./scripts/compatibility-test.sh       # Compatibility with existing features
./scripts/rainbowkit-removal-check.sh # RainbowKit removal verification
```

### Manual Testing

Complete the manual testing checklist:

```bash
cd packages/nextjs
cat TESTING_CHECKLIST.md
```

The checklist covers:
- Sign-in/sign-out flows
- User information display
- Route protection
- Browser compatibility
- Mobile responsiveness
- Session persistence
- Server-side user access

### Testing Documentation

For detailed testing information, see:
- `packages/nextjs/TESTING_CHECKLIST.md` - Manual testing checklist
- `packages/nextjs/TESTING_SUMMARY.md` - Complete testing summary
- `packages/nextjs/scripts/` - Automated test scripts

## Documentation

Visit our [docs](https://docs.scaffoldeth.io) to learn how to start building with Scaffold-ETH 2.

To know more about its features, check out our [website](https://scaffoldeth.io).

## Contributing to Scaffold-ETH 2

We welcome contributions to Scaffold-ETH 2!

Please see [CONTRIBUTING.MD](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/CONTRIBUTING.md) for more information and guidelines for contributing to Scaffold-ETH 2.