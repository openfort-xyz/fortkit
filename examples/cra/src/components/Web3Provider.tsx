import React from 'react';

import { WagmiProvider, createConfig } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { KitOAuthProvider, OpenfortKitProvider, getDefaultConfig } from 'connectkit';
import { RecoveryMethod } from '@openfort/openfort-js';

const config = createConfig(
  getDefaultConfig({
    appName: 'OpenfortKit CRA demo',
  })
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <OpenfortKitProvider
          debugMode
          publishableKey={process.env.REACT_APP_OPENFORT_PUBLIC_KEY!}

          walletConfig={{
            // In this example, we require the user to link their wallet on sign up.
            // We don't need an embedded signer for this example,
            // we will be using the user wallet for signing.

            linkWalletOnSignUp: true,
          }}

          options={{
            authProviders: [
              KitOAuthProvider.WALLET,
              KitOAuthProvider.EMAIL,
            ]
          }}
        >
          {children}
        </OpenfortKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
