import { ethers } from "ethers";
import { formatEther } from "ethers/lib/utils";
import styled from "styled-components";
import Button from "../Buttons";
import Guess from "../../views/Guess";

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

interface GuessProps {
  handleGuess: () => void;
  amount: string;
  setAmount: (amount: string) => void;
  handleApproval: () => void;
  userGuess: string;
  setUserGuess: (guess: string) => void;
  walletConnected: boolean;
  allowance: ethers.BigNumber;
  isWrongGuess: boolean;
  setIsWrongGuess: (isWrongGuess: boolean) => void;
}

const GuessComponent = ({
  handleGuess,
  amount,
  setAmount,
  handleApproval,
  userGuess,
  setUserGuess,
  walletConnected,
  allowance,
  isWrongGuess = true,
  setIsWrongGuess,
}: GuessProps) => {
  return (
    <div className="p-4 flex flex-col justify-between h-full">
      <div className="flex justify-center">
        {isWrongGuess ? (
          <img src="/assets/fail.png" alt="wrong" />
        ) : (
          <h1 className="text-4xl font-bold text-white mb-2">Guess 🎉 </h1>
        )}
      </div>
      <div className="mb-4">
        <div className="relative mb-4">
          <label className="text-lg mb-2">
            Number of guesses you want to buy
          </label>
          <StyledInputBlock>
            <StyledInput
              data-testId="amount-input"
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
          <Button
            variant="primary"
            rounded
            disabled={amount === "" || parseFloat(amount) === 0}
            onClick={handleApproval}
            className="w-12 h-12 ml-4 flex items-center justify-center absolute top-10 right-0"
          >
            <span className="text-2xl text-black">+</span>
          </Button>
        </div>

        <div>
          <label>Guess the secret number</label>
          <StyledInputBlock>
            <StyledInput
              data-testId="guess-input"
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
        onClick={isWrongGuess ? () => setIsWrongGuess(false) : handleGuess}
        disabled={
          !isWrongGuess &&
          (userGuess === "" ||
            !walletConnected ||
            parseFloat(formatEther(allowance)) < 1)
        }
      >
        {isWrongGuess ? "Guess Again" : "Guess"}
      </Button>
    </div>
  );
};

export default GuessComponent;
