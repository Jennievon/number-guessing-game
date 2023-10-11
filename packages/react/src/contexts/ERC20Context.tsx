import { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import ERC20 from "../artifacts/contracts/ERC20.sol/ERC20.json";
import { useWalletConnection } from "./WalletConnectionContext";
import { Constants } from "../libs/utils/constants";
import { ERC20ContextType, ERC20ProviderProps } from "../libs/types";

const ERC20Context = createContext<ERC20ContextType | undefined>(undefined);

export const useERC20 = () => {
  const context = useContext(ERC20Context);
  if (!context) {
    throw new Error("useERC20 must be used within an ERC20Provider");
  }
  return context;
};

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
        setERC20Contract(erc20);
        setSymbol(await erc20.symbol());
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
        gasLimit: Constants.GAS_LIMIT,
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
