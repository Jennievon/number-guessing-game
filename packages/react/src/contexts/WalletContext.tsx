import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import ERC20 from "../artifacts/contracts/ERC20.sol/ERC20.json";
import Guess from "../artifacts/contracts/Guess.sol/Guess.json";
import { enqueueSnackbar } from "notistack";

const ERC20_ADDRESS = "0x25d93cE6d71fe2d961ef132398fc3B03Bd8bCf65";
const GUESS_ADDRESS = "0xcb2A59aa573059c22E77D8d3a858a7BFC9E74929";

interface WalletContextType {
  walletConnected: boolean;
  walletAddress: string;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  erc20Contract: ethers.Contract | null;
  guessContract: ethers.Contract | null;
  signerAddress: string;
  symbol: string;
  approveGuess: (amount: ethers.BigNumber) => Promise<void>;
  guess: (guessInput: number) => Promise<void>;
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

export const WalletProvider = ({ children }: WalletProviderProps) => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);
  const [signerAddress, setSignerAddress] = useState("");
  const [symbol, setSymbol] = useState("");
  const [erc20Contract, setErc20Contract] = useState<ethers.Contract | null>(
    null
  );
  const [guessContract, setGuessContract] = useState<ethers.Contract | null>(
    null
  );

  useEffect(() => {
    if ((window as any).ethereum) {
      const ethProvider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      setProvider(ethProvider);

      ethProvider
        .listAccounts()
        .then((accounts) => {
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
            setWalletConnected(true);
          }
        })
        .catch((error) => {
          console.error("Error checking for connected wallet:", error);
        });
    }
  }, []);

  const connectHandler = async () => {
    if (!provider) {
      return;
    }
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    const erc20 = new ethers.Contract(ERC20_ADDRESS, ERC20.abi, signer);
    const guess = new ethers.Contract(GUESS_ADDRESS, Guess.abi, signer);
    setSymbol(await erc20.symbol());
    setErc20Contract(erc20);
    setGuessContract(guess);
    setSignerAddress(address);
    setWalletAddress(address);
    setWalletConnected(true);
  };

  React.useEffect(() => {
    connectHandler();
  }, [walletConnected]);

  const connectWallet = async () => {
    try {
      if (provider) {
        connectHandler();
      } else {
        console.error("MetaMask is not installed.");
      }
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

  const approveGuess = async (amount: ethers.BigNumber) => {
    if (!erc20Contract || !guessContract) {
      return;
    }

    try {
      const approval = await erc20Contract.approve(
        guessContract.address,
        amount,
        { gasLimit: 400000 }
      );
      await approval.wait();
    } catch (error: any) {
      throw new Error("Error while attempting to approve: " + error.message);
    }
  };

  async function guess(guessInput: number) {
    if (!guessContract) {
      return;
    }

    try {
      const attempt = await guessContract.attempt(guessInput, {
        gasLimit: 400000,
      });
      attempt.wait();
    } catch (error) {
      enqueueSnackbar(
        "Error while attempting to guess." + JSON.stringify(error)
      );
    }
  }

  const walletContextValue: WalletContextType = {
    walletConnected,
    walletAddress,
    connectWallet,
    disconnectWallet,
    erc20Contract,
    guessContract,
    signerAddress,
    symbol,
    approveGuess,
    guess,
  };

  return (
    <WalletContext.Provider value={walletContextValue}>
      {children}
    </WalletContext.Provider>
  );
};
