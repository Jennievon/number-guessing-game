import { ethers } from "ethers";

export interface WalletConnectionContextType {
  walletConnected: boolean;
  walletAddress: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  signer: ethers.Signer | null;
  signerAddress: string | null;
  accountBalance: string | null;
  allowance: ethers.BigNumber;
  setAllowance: (allowance: ethers.BigNumber) => void;
}

export interface Props {
  children: React.ReactNode;
}

export interface State {
  hasError: boolean;
}

export interface WalletConnectionProviderProps {
  children: React.ReactNode;
}

export interface ERC20ContextType {
  erc20Contract: ethers.Contract | null;
  approve: (amount: ethers.BigNumber, address: string) => Promise<void>;
  symbol: string;
}
export interface ERC20ProviderProps {
  children: React.ReactNode;
}

export interface ThemeContextType {
  theme: string;
  otherTheme: string;
  toggleTheme: () => void;
}

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export interface GuessContextType {
  guessContract: ethers.Contract | null;
  guess: (guessInput: number) => Promise<void>;
}

export interface GuessProviderProps {
  children: React.ReactNode;
}
