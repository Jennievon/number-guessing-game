import ThemeToggle from "./ThemeToggle";
import ConnectWalletButton from "./Buttons/ConnectWalletButton";
import { useWalletConnection } from "../contexts/WalletConnectionContext";
import { truncateAddress } from "../libs/utils/helper";
import Tooltip from "./Tooltip";
import { useERC20 } from "../contexts/ERC20Context";

const Header = () => {
  const { walletAddress, accountBalance } = useWalletConnection();
  const { symbol } = useERC20();

  return (
    <header className="bg-gray-900 dark:bg-zinc-900/90 text-white dark:text-zinc-100 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-xl font-bold">Obscuro Guessing Game</h1>
      </div>
      <div className="flex items-center">
        <ConnectWalletButton>
          {walletAddress && (
            <>
              <p className="text-lg font-bold pr-6">
                {accountBalance
                  ? parseFloat(accountBalance).toFixed(4)
                  : "0.0000"}{" "}
                {symbol}
              </p>
              <Tooltip content={walletAddress}>
                <span className="text-14 font-normal pl-6">
                  {truncateAddress(walletAddress)}
                </span>
              </Tooltip>
            </>
          )}
        </ConnectWalletButton>
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
