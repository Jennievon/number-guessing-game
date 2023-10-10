import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import ERC20 from "../artifacts/contracts/ERC20.sol/ERC20.json";
import { useWalletConnection } from "./WalletConnectionContext";
import { Constants } from "../libs/utils/constants";

const ERC20Context = createContext<ERC20ContextType | undefined>(undefined);

interface ERC20ContextType {
  erc20Contract: ethers.Contract | null;
  approve: (amount: ethers.BigNumber, address: string) => Promise<void>;
  symbol: string;
}

export const useERC20 = () => {
  const context = useContext(ERC20Context);
  if (!context) {
    throw new Error("useERC20 must be used within an ERC20Provider");
  }
  return context;
};

interface ERC20ProviderProps {
  children: React.ReactNode;
}

export const ERC20Provider = ({ children }: ERC20ProviderProps) => {
  const { signer } = useWalletConnection();
  const [symbol, setSymbol] = useState("");
  const [erc20Contract, setERC20Contract] = useState<ethers.Contract | null>(
    null
  );

  useEffect(() => {
    const initERC20Contract = async () => {
      if (signer) {
        const erc20 = new ethers.Contract(
          Constants.ERC20_ADDRESS,
          ERC20.abi,
          signer
        );
        setSymbol(await erc20.symbol());
        setERC20Contract(erc20);
      }
    };

    initERC20Contract();
  }, [signer]);

  const approve = async (amount: ethers.BigNumber, address: string) => {
    if (!erc20Contract) {
      throw new Error("ERC20 contract is not initialized.");
    }

    try {
      const approval = await erc20Contract.approve(address, amount, {
        gasLimit: 400000,
      });
      await approval.wait();
    } catch (error: any) {
      throw new Error("Error while attempting to approve: " + error.message);
    }
  };

  const erc20ContextValue: ERC20ContextType = {
    erc20Contract,
    approve,
    symbol,
  };

  return (
    <ERC20Context.Provider value={erc20ContextValue}>
      {children}
    </ERC20Context.Provider>
  );
};
