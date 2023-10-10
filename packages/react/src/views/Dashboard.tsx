import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { useSnackbar } from "notistack";
import { useWalletConnection } from "../contexts/WalletConnectionContext";
import { useERC20 } from "../contexts/ERC20Context";
import { useGuess } from "../contexts/GuessContext";
import Button from "../components/Buttons";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const { walletAddress, accountBalance } = useWalletConnection();
  const { erc20Contract, symbol } = useERC20();
  const { guessContract } = useGuess();
  const { enqueueSnackbar } = useSnackbar();
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

  return (
    <div>
      <div className="flex flex-col items-center justify-center w-full px-4 py-2 rounded-lg mb-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg min-h-[100px]">
        <h3 className="text-white text-xl mb-2">
          <span className="text-2xl">
            {accountBalance} {symbol}
          </span>
        </h3>
        <h3 className="text-white">
          {parseFloat(formatEther(allowance))} more guess(es)
        </h3>
      </div>

      <Button
        primary
        rounded
        className="w-full mb-4"
        onClick={() => navigate("/guess")}
      >
        <span className="text-14 font-normal px-6">Guess</span>
      </Button>

      {/* <div className="overflow-auto max-h-[350px] bg-gray-900 rounded-lg p-4">
            {transactions.map((item: Transaction, index: number) => (
              <div
                className="bg-gray-800 rounded-lg p-4 flex justify-between items-center mb-2"
                key={index}
              >
                <div>
                  <h4 className="text-white text-sm">Sent Ether</h4>
                  <p className="text-gray-400 text-xs">
                    {item.date} {item.time}
                  </p>
                </div>
                <div>
                  <h4 className="text-red-500 text-sm">-{item.amount} ETH</h4>
                  <p className="text-red-500 text-xs">
                    -${item.fiatAmount} USD
                  </p>
                </div>
              </div>
            ))}
          </div> */}
    </div>
  );
}

export default Dashboard;
