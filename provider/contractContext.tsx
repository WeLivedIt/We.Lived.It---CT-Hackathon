import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAccount} from 'wagmi';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ABI from "../contractFile.json";
import { ethers } from "ethers";
import { useWriteContract, useReadContract  } from 'wagmi'
import { Config } from 'wagmi';
import {config} from "../src/wagmi"

const CONTRACT_ADDRESS = 'YOUR_DEPLOYED_CONTRACT_ADDRESS';

interface OrganizationData {
  id: string;
  communityType: string;
  context: string;
  hateSpeechCategories: string[];
}

interface OrganizationContextType {
  organizationData: OrganizationData | null;
}

const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);
const abi = ABI.abi;

// Create a Wagmi config
// const config = createConfig({
//   chains: [mainnet],
//   transports: {
//     [mainnet.id]: http(),
//   },
// });

// Create a react-query client
const queryClient = new QueryClient();
const contractAddress = "0x62E2b4B05e005765D09066e9A936fC205de1778A"

const OrganizationProviderInner: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { address, isConnected } = useAccount();
  const [organizationData, setOrganizationData] = useState<OrganizationData | null>(null);


  const { data: balance } = useReadContract({
    ...config,
    functionName: 'balanceOf',
    args: ['0x03A71968491d55603FFe1b11A9e23eF013f75bCF'],
  })

  const { data: hash, writeContract } = useWriteContract()

  writeContract({
    address: contractAddress,
    abi: ABI.abi,
    functionName: 'mint',

  })



  return (
    <OrganizationContext.Provider value={{organizationData }}>
      {children}
    </OrganizationContext.Provider>
  );
};

export const OrganizationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <OrganizationProviderInner>{children}</OrganizationProviderInner>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

export const useOrganization = () => {
  const context = useContext(OrganizationContext);
  if (context === undefined) {
    throw new Error('useOrganization must be used within an OrganizationProvider');
  }
  return context;
};