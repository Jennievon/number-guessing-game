import { useWallet } from "../contexts/WalletContext";
import Button from "./Buttons";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const { walletConnected, walletAddress, connectWallet } = useWallet();
  return (
    <header
      className="bg-gray-900 dark:bg-zinc-900/90
     text-white dark:text-zinc-100
     p-4 flex justify-between items-center"
    >
      <div className="flex items-center">
        <h1 className="text-xl font-bold">Obscuro Guessing Game</h1>
      </div>
      <div className="flex items-center">
        <Button primary rounded className="mr-4">
          <span className="text-14 font-normal px-6">Connect Wallet</span>
        </Button>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
