import { burner } from "burner-connector";
import * as chains from "viem/chains";
import { coinbaseWallet, injected, walletConnect } from "wagmi/connectors";
import scaffoldConfig from "~~/scaffold.config";

const { onlyLocalBurnerWallet, targetNetworks } = scaffoldConfig;

/**
 * wagmi connectors for the wagmi context
 */
export const wagmiConnectors = () => {
  // Only create connectors on client-side to avoid SSR issues
  if (typeof window === "undefined") {
    return [];
  }

  const connectors = [
    injected(),
    walletConnect({
      projectId: scaffoldConfig.walletConnectProjectId,
    }),
    coinbaseWallet({
      appName: "scaffold-eth-2",
    }),
  ];

  // Add burner wallet for local development
  if (!targetNetworks.some(network => network.id !== (chains.hardhat as chains.Chain).id) || !onlyLocalBurnerWallet) {
    connectors.push(burner() as any);
  }

  return connectors;
};
