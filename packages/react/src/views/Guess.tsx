import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { useWalletConnection } from "../contexts/WalletConnectionContext";
import { useSnackbar } from "notistack";
import Button from "../components/Buttons";
import { useERC20 } from "../contexts/ERC20Context";
import { useGuess } from "../contexts/GuessContext";
import GuessComponent from "../components/Guess/GuessComponent";
import SuccessModal from "../components/SuccessModal";

const Guess = () => {
  const { walletConnected, allowance, setAllowance, walletAddress } =
    useWalletConnection();
  const { erc20Contract, approve, symbol } = useERC20();
  const { guessContract, guess } = useGuess();
  const { enqueueSnackbar } = useSnackbar();

  const [amount, setAmount] = useState("");
  const [userGuess, setUserGuess] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isWrongGuess, setIsWrongGuess] = useState(false);

  useEffect(() => {
    if (erc20Contract && guessContract) {
      erc20Contract
        .allowance(walletAddress, guessContract.address)
        .then((result: ethers.BigNumber) => {
          setAllowance(result);
        });
    }
  }, [erc20Contract, guessContract, walletAddress]);

  const handleGuess = () => {
    if (!guessContract) return;

    const input = parseInt(userGuess);
    if (isNaN(input) || input < 1) {
      enqueueSnackbar("Please enter a valid number greater than 0.", {
        variant: "error",
      });
      return;
    }

    const filterGuess = guessContract.filters.GuessResult(walletAddress);
    guessContract.on(filterGuess, (_, allowance, prize, guess, msg) => {
      setAllowance(allowance);
      enqueueSnackbar(
        `Your guess of ${guess} was ${msg} ${ethers.utils.formatEther(
          prize
        )} ${symbol}.`,
        { variant: msg === "correct" ? "success" : "error" }
      );
      if (msg === "correct") {
        setShowSuccessModal(true);
      } else {
        setIsWrongGuess(true);
      }
    });

    guess(input);
    setUserGuess("");
  };

  const handleApproval = async () => {
    if (!guessContract || !erc20Contract) return;

    const filterApproval = erc20Contract.filters.Approval(walletAddress);

    try {
      const num = allowance.add(ethers.utils.parseEther(amount));
      await approve(num, guessContract.address);

      erc20Contract.on(filterApproval, (owner, _, value) => {
        setAllowance(value);
        enqueueSnackbar(
          `Approval of ${ethers.utils.formatEther(
            value
          )} ${symbol} by account ${owner} to the game was successful.`,
          { variant: "success" }
        );
      });

      setAmount("");
    } catch (error: any) {
      enqueueSnackbar("Error while attempting to approve: " + error.message, {
        variant: "error",
      });
    }
  };

  return (
    <>
      <GuessComponent
        handleGuess={handleGuess}
        amount={amount}
        setAmount={setAmount}
        handleApproval={handleApproval}
        userGuess={userGuess}
        setUserGuess={setUserGuess}
        walletConnected={walletConnected}
        allowance={allowance}
        isWrongGuess={isWrongGuess}
        setIsWrongGuess={setIsWrongGuess}
      />
      {showSuccessModal && (
        <SuccessModal
          isOpen={showSuccessModal}
          onClose={() => setShowSuccessModal(false)}
        />
      )}
    </>
  );
};

export default Guess;
