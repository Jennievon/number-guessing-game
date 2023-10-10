import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers, JsonRpcProvider } from "ethers";

// Create a context for the wallet
interface WalletContextType {
  walletConnected: boolean;
  walletAddress: string;
  connectWallet: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};

interface WalletProviderProps {
  children: React.ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [provider, setProvider] = useState<JsonRpcProvider | null>(null);

  useEffect(() => {
    if ((window as any).ethereum) {
      const ethProvider = new JsonRpcProvider((window as any).ethereum);
      setProvider(ethProvider);
    }
  }, []);

  const connectWallet = async () => {
    try {
      if (provider) {
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await (await signer).getAddress();
        setWalletAddress(address);
        setWalletConnected(true);
      } else {
        console.error("MetaMask is not installed.");
      }
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  };

  const walletContextValue: WalletContextType = {
    walletConnected,
    walletAddress,
    connectWallet,
  };

  return (
    <WalletContext.Provider value={walletContextValue}>
      {children}
    </WalletContext.Provider>
  );
};
