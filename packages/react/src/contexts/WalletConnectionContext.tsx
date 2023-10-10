import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  WalletConnectionContextType,
  WalletConnectionProviderProps,
} from "../libs/types";

const WalletConnectionContext = createContext<
  WalletConnectionContextType | undefined
>(undefined);

export const useWalletConnection = () => {
  const context = useContext(WalletConnectionContext);
  if (!context) {
    throw new Error(
      "useWalletConnection must be used within a WalletConnectionProvider"
    );
  }
  return context;
};

export const WalletConnectionProvider = ({
  children,
}: WalletConnectionProviderProps) => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [accountBalance, setAccountBalance] = useState("");

  const [allowance, setAllowance] = useState(ethers.BigNumber.from(0));
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);

  useEffect(() => {
    const initWalletConnection = async () => {
      if ((window as any).ethereum) {
        const ethProvider = new ethers.providers.Web3Provider(
          (window as any).ethereum
        );
        setProvider(ethProvider);

        try {
          await ethProvider.send("eth_requestAccounts", []);
          const signer = ethProvider.getSigner();
          const address = await signer.getAddress();
          setSigner(signer);
          setWalletAddress(address);
          setWalletConnected(true);
        } catch (error) {
          console.error("Error connecting to wallet:", error);
        }
      }
    };

    initWalletConnection();
  }, []);

  const connectWallet = async () => {
    if (!provider) {
      console.error("MetaMask is not installed.");
      return;
    }

    try {
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setWalletAddress(address);
      setWalletConnected(true);
    } catch (error) {
      console.error("Error connecting to wallet:", error);
    }
  };

  const disconnectWallet = () => {
    if (provider) {
      provider.removeAllListeners();
    }
    setWalletConnected(false);
    setWalletAddress("");
  };

  const getBalance = async () => {
    try {
      if (!provider) {
        return;
      }
      let balance: any = await provider.getBalance(walletAddress);
      balance = parseFloat(ethers.utils.formatEther(balance));
      setAccountBalance(balance.toFixed(6));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBalance();
  }, [walletAddress]);

  const walletConnectionContextValue: WalletConnectionContextType = {
    walletConnected,
    walletAddress,
    connectWallet,
    disconnectWallet,
    signer,
    signerAddress: walletAddress,
    accountBalance,
    allowance,
    setAllowance,
  };

  return (
    <WalletConnectionContext.Provider value={walletConnectionContextValue}>
      {children}
    </WalletConnectionContext.Provider>
  );
};
