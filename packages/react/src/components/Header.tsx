import React from "react";
import Button from "./Buttons";
import ThemeToggle from "./ThemeToggle";
import Tooltip from "./Tooltip";
import { truncateAddress } from "../libs/utils/helper";
import { useWalletConnection } from "../contexts/WalletConnectionContext";

const Header = () => {
  const { walletConnected, walletAddress, connectWallet, disconnectWallet } =
    useWalletConnection();

  return (
    <header className="bg-gray-900 dark:bg-zinc-900/90 text-white dark:text-zinc-100 p-4 flex justify-between items-center">
      <div className="flex items-center">
        <h1 className="text-xl font-bold">Obscuro Guessing Game</h1>
      </div>
      <div className="flex items-center">
        {walletConnected ? (
          <>
            <Tooltip content={walletAddress}>
              <span className="text-14 font-normal px-6">
                {truncateAddress(walletAddress)}
              </span>
            </Tooltip>
            <Button primary rounded className="mr-4" onClick={disconnectWallet}>
              <span className="text-14 font-normal px-6">
                Disconnect Wallet
              </span>
            </Button>
          </>
        ) : (
          <Button primary rounded className="mr-4" onClick={connectWallet}>
            <span className="text-14 font-normal px-6">Connect Wallet</span>
          </Button>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
