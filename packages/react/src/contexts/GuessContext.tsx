import React, { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import Guess from "../artifacts/contracts/Guess.sol/Guess.json";
import { useWalletConnection } from "./WalletConnectionContext";
import { Constants } from "../libs/utils/constants";
import { GuessContextType, GuessProviderProps } from "../libs/types";

const GuessContext = createContext<GuessContextType | undefined>(undefined);

export const useGuess = () => {
  const context = useContext(GuessContext);
  if (!context) {
    throw new Error("useGuess must be used within a GuessProvider");
  }
  return context;
};

export const GuessProvider = ({ children }: GuessProviderProps) => {
  const { signer } = useWalletConnection();
  const [guessContract, setGuessContract] = useState<ethers.Contract | null>(
    null
  );

  useEffect(() => {
    const initGuessContract = async () => {
      if (signer) {
        const guess = new ethers.Contract(
          Constants.GUESS_ADDRESS,
          Guess.abi,
          signer
        );
        setGuessContract(guess);
      }
    };

    initGuessContract();
  }, [signer]);

  const guess = async (guessInput: number) => {
    if (!guessContract) {
      throw new Error("Guess contract is not initialized.");
    }

    try {
      const attempt = await guessContract.attempt(guessInput, {
        gasLimit: Constants.GAS_LIMIT,
      });
      await attempt.wait();
    } catch (error: any) {
      throw new Error("Error while attempting to guess: " + error.message);
    }
  };

  const guessContextValue: GuessContextType = {
    guessContract,
    guess,
  };

  return (
    <GuessContext.Provider value={guessContextValue}>
      {children}
    </GuessContext.Provider>
  );
};
