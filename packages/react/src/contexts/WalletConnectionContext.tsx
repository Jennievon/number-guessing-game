import { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import {
  WalletConnectionContextType,
  WalletConnectionProviderProps,
} from "../libs/types";

const WalletConnectionContext =
  createContext<WalletConnectionContextType | null>(null);

export const useWalletConnection = (): WalletConnectionContextType => {
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
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [accountBalance, setAccountBalance] = useState<string | null>(null);
  const [allowance, setAllowance] = useState<ethers.BigNumber>(
    ethers.BigNumber.from(0)
  );
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);

  useEffect(() => {
    connectWallet();
  }, []);

  const connectWallet = async () => {
    if ((window as any).ethereum) {
      const ethProvider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      setProvider(ethProvider);

      try {
        await ethProvider.send("eth_requestAccounts", []);
        const signer = ethProvider.getSigner();
        const address = await signer.getAddress();
        const balance = await ethProvider.getBalance(address);
        const formattedBalance = ethers.utils.formatEther(balance);
        setAccountBalance(formattedBalance);
        setSigner(signer);
        setWalletAddress(address);
        setWalletConnected(true);
      } catch (error) {
        console.error("Error connecting to wallet:", error);
      }
    } else {
      console.error("No ethereum object found.");
    }
  };

  const disconnectWallet = () => {
    if (provider) {
      provider.removeAllListeners();
      setWalletConnected(false);
      setWalletAddress(null);
      setAccountBalance(null);
      setAllowance(ethers.BigNumber.from(0));
      setSigner(null);
      setProvider(null);
    }
  };

  useEffect(() => {
    const ethereum = (window as any).ethereum;
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        console.log("Please connect to MetaMask.");
      } else if (accounts[0] !== walletAddress) {
        setWalletAddress(accounts[0]);
      }
    };
    ethereum.on("accountsChanged", handleAccountsChanged);
    return () => {
      ethereum.removeListener("accountsChanged", handleAccountsChanged);
    };
  });

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
