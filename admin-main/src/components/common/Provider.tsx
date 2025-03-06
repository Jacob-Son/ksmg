"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import React from "react";
import { WagmiConfig, createConfig, mainnet } from "wagmi";
import { createPublicClient, http } from "viem";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { polygon, polygonMumbai } from "viem/chains";

const queryClient = new QueryClient();

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: process.env.NEXT_PUBLIC_CHAIN_ID === "137" ? polygon : polygonMumbai,
    transport: http(),
  }),
});

export const connector = new MetaMaskConnector({
  chains: [polygon, polygonMumbai],
  options: {
    shimDisconnect: false,
  },
});

function Provider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <WagmiConfig config={config}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WagmiConfig>
    </SessionProvider>
  );
}

export default Provider;
