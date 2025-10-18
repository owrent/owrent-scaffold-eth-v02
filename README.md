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

This template includes Civic Auth for embedded wallet authentication. Two example pages demonstrate different authentication patterns:

### Profile Page (`/profile`)
Shows how to use the `useUser` hook to:
- Display user information (name, email, wallet address)
- Handle loading states
- Prompt unauthenticated users to sign in

### Civic Auth Example Page (`/civic-auth-example`)
Demonstrates authentication event handling:
- Detecting when users sign in or sign out
- Tracking authentication state changes with `useEffect`
- Logging authentication events
- Accessing user information in real-time

Visit these pages after starting your app to see Civic Auth in action.


## Documentation

Visit our [docs](https://docs.scaffoldeth.io) to learn how to start building with Scaffold-ETH 2.

To know more about its features, check out our [website](https://scaffoldeth.io).

## Contributing to Scaffold-ETH 2

We welcome contributions to Scaffold-ETH 2!

Please see [CONTRIBUTING.MD](https://github.com/scaffold-eth/scaffold-eth-2/blob/main/CONTRIBUTING.md) for more information and guidelines for contributing to Scaffold-ETH 2.