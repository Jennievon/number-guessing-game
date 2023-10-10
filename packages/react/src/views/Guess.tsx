import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useWalletConnection } from "../contexts/WalletConnectionContext";
import { formatEther } from "ethers/lib/utils";
import { useSnackbar } from "notistack";
import Button from "../components/Buttons";
import { useERC20 } from "../contexts/ERC20Context";
import { useGuess } from "../contexts/GuessContext";
import { useNavigate } from "react-router-dom";

const Guess = () => {
  const navigate = useNavigate();
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
    <div className="p-4 flex flex-col justify-between h-full">
      <div className="mb-4">
        <div className="mb-4 flex flex-col">
          <label className="text-lg mb-2">Number of guesses:</label>
          <div className="flex items-center">
            <input
              type="number"
              className="p-2 border rounded mr-2"
              placeholder="Enter number of guesses"
              value={amount}
              min={0}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Button
              primary
              disabled={amount === "" || parseFloat(amount) === 0}
              onClick={handleApproval}
            >
              Approve
            </Button>
          </div>
        </div>

        <div className="mb-4 flex items-center">
          <input
            type="number"
            className="p-2 border rounded mr-2 w-full"
            placeholder="Enter your guess"
            value={userGuess}
            min={0}
            onChange={(e) => setUserGuess(e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          rounded
          onClick={() => {
            navigate("/");
          }}
        >
          <span className="text-danger">Cancel</span>
        </Button>
        <Button
          rounded
          onClick={handleGuess}
          disabled={
            amount === "" || parseFloat(amount) === 0 || userGuess === ""
          }
        >
          Guess
        </Button>
      </div>
    </div>
  );
};

export default Guess;
