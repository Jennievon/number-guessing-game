import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { useWalletConnection } from "../contexts/WalletConnectionContext";
import { useSnackbar } from "notistack";
import Button from "../components/Buttons";
import { useERC20 } from "../contexts/ERC20Context";
import { useGuess } from "../contexts/GuessContext";
import styled from "styled-components";

const StyledInputBlock = styled.div`
  border-bottom: 1px solid #ccc;
  padding-bottom: 1rem;
`;

const StyledInput = styled.input`
  border: none;
  outline: none;
  box-shadow: none;
  font-size: 50px;
  font-weight: 700;
  margin-bottom: 1rem;
  width: 100%;
  background-color: transparent;
  color: #fff;

  -webkit-appearance: none;
  -moz-appearance: textfield;

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Guess = () => {
  const { walletConnected, allowance, setAllowance, walletAddress } =
    useWalletConnection();
  const { erc20Contract, approve, symbol } = useERC20();
  const { guessContract, guess } = useGuess();
  const { enqueueSnackbar } = useSnackbar();
  const [amount, setAmount] = useState("");
  const [userGuess, setUserGuess] = useState("");

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
        )} OGG.`,
        { variant: msg === "correct" ? "success" : "error" }
      );
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
    <div className="p-4 flex flex-col justify-between h-full">
      <div className="mb-4">
        <div className="mb-4 flex flex-col">
          <div className="flex items-center">
            <div>
              <label className="text-lg mb-2">
                Number of guesses you want to buy
              </label>
              <StyledInputBlock>
                <StyledInput
                  type="number"
                  placeholder="0"
                  min={0}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <p className="text-gray-400">
                  {parseFloat(formatEther(allowance))} guesses available
                </p>
              </StyledInputBlock>
            </div>
            <Button
              variant="primary"
              rounded
              disabled={amount === "" || parseFloat(amount) === 0}
              onClick={handleApproval}
              className="w-12 h-12 ml-4 flex items-center justify-center"
            >
              <span className="text-2xl text-black">+</span>
            </Button>
          </div>
        </div>

        <div>
          <label>Guess the secret number</label>
          <StyledInputBlock>
            <StyledInput
              type="number"
              placeholder="0"
              value={userGuess}
              min={0}
              onChange={(e) => setUserGuess(e.target.value)}
            />
            <p className="text-gray-400">Secret Number</p>
          </StyledInputBlock>
        </div>
      </div>
      <Button
        rounded
        onClick={handleGuess}
        disabled={
          amount === "" ||
          parseFloat(amount) === 0 ||
          !walletConnected ||
          parseFloat(formatEther(allowance)) < 1
        }
      >
        Guess
      </Button>
    </div>
  );
};

export default Guess;
