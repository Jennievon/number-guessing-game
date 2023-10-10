import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { useSnackbar } from "notistack";
import { useWalletConnection } from "../contexts/WalletConnectionContext";
import { useERC20 } from "../contexts/ERC20Context";
import { useGuess } from "../contexts/GuessContext";

function Dashboard() {
  const { walletAddress } = useWalletConnection();
  const { erc20Contract, symbol, approve } = useERC20();
  const { guessContract, guess } = useGuess();
  const { enqueueSnackbar } = useSnackbar();
  const [amount, setAmount] = useState("");
  const [userGuess, setUserGuess] = useState("");
  const [allowance, setAllowance] = useState(ethers.BigNumber.from(0));

  useEffect(() => {
    if (erc20Contract && guessContract) {
      const filterApproval = erc20Contract.filters.Approval(walletAddress);
      const filterGuess = guessContract.filters.GuessResult(walletAddress);

      erc20Contract
        .allowance(walletAddress, guessContract.address)
        .then((result: ethers.BigNumber) => {
          setAllowance(result);
        });

      erc20Contract.on(filterApproval, (owner, _, value) => {
        setAllowance(value);
        console.log(
          "🚀 ~ file: Dashboard.tsx:28 ~ erc20Contract.on ~ value:",
          value
        );
        enqueueSnackbar(
          `Approval of ${ethers.utils.formatEther(
            value
          )} ${symbol} by account ${owner} to the game was successful.`,
          { variant: "success" }
        );
      });

      guessContract.on(filterGuess, (_, allowance, prize, guess, msg) => {
        setAllowance(allowance);
        enqueueSnackbar(
          `Your guess of ${guess} was ${msg} ${ethers.utils.formatEther(
            prize
          )} OGG.`,
          { variant: msg === "correct" ? "success" : "error" }
        );
      });
    }
  }, [erc20Contract, guessContract, walletAddress]);

  const handleGuess = () => {
    const input = parseInt(userGuess);
    if (isNaN(input)) {
      enqueueSnackbar("Please enter a valid number.", { variant: "error" });
      return;
    }
    if (input < 1) {
      enqueueSnackbar("Please enter a number greater than 0.", {
        variant: "error",
      });
      return;
    }
    guess(input);
    setUserGuess("");
  };

  const handleApproval = async () => {
    if (!guessContract) {
      console.log(
        "🚀 ~ file: Dashboard.tsx:73 ~ handleApproval ~ guessContract:",
        guessContract
      );
      return;
    }
    try {
      const num = allowance.add(ethers.utils.parseEther(amount));
      await approve(num, guessContract.address);
      setAmount("");
    } catch (error: any) {
      enqueueSnackbar("Error while attempting to approve: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Number Guessing Game</h1>
      <p>
        You have {formatEther(allowance)} {symbol} for guesses.
      </p>
      <div className="flex items-center mb-4">
        <label className="mr-2">
          Choose the number of guesses you want to buy:
        </label>
        <input
          type="number"
          className="p-2 border rounded mr-2"
          placeholder="Enter number of guesses"
          value={amount}
          min={0}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleApproval}
        >
          Approve game fee
        </button>
      </div>
      <div className="flex mb-4">
        <input
          type="number"
          className="p-2 border rounded mr-2"
          placeholder="Enter your guess"
          value={userGuess}
          min={0}
          onChange={(e) => setUserGuess(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={handleGuess}
          disabled={parseFloat(formatEther(allowance)) < parseFloat(amount)}
        >
          Guess
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
