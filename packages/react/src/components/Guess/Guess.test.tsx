import { render, fireEvent, screen } from "@testing-library/react";
import Guess from "./GuessComponent";
import { BigNumber } from "ethers";

describe("Guess Component", () => {
  const handleGuess = jest.fn();
  const setAmount = jest.fn();
  const handleApproval = jest.fn();
  const setUserGuess = jest.fn();
  const guessAgain = jest.fn();
  const walletConnected = true;
  const allowance = BigNumber.from(100);
  const amount = "10";
  const userGuess = "5";

  const renderGuessComponent = () => {
    render(
      <Guess
        handleGuess={handleGuess}
        setAmount={setAmount}
        handleApproval={handleApproval}
        setUserGuess={setUserGuess}
        walletConnected={walletConnected}
        allowance={allowance}
        amount={amount}
        userGuess={userGuess}
        isWrongGuess={false}
        guessAgain={guessAgain}
      />
    );
  };

  it("renders without errors", () => {
    renderGuessComponent();
    expect(screen.getByText("Guess the secret number")).toBeInTheDocument();
  });

  it("handles invalid input", () => {
    renderGuessComponent();
    const guessInput = screen.getByTestId("guess-input");
    const guessButton = screen.getByText("Guess");
    fireEvent.change(guessInput, { target: { value: "-1" } });
    fireEvent.click(guessButton);
    expect(handleGuess).not.toHaveBeenCalled();
  });

  it("allows valid input and submits a guess", () => {
    renderGuessComponent();
    const guessInput = screen.getByTestId("guess-input");
    const guessButton = screen.getByText("Guess");
    fireEvent.change(guessInput, { target: { value: "5" } });
    fireEvent.click(guessButton);
    expect(screen.getByText("Guess")).toBeInTheDocument();
  });

  it("disables Guess button when conditions are not met", () => {
    renderGuessComponent();
    const guessButton = screen.getByText("Guess");
    expect(guessButton).toBeDisabled();
  });
});
