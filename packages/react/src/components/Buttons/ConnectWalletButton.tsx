import React from "react";
import Button from ".";
import { useWalletConnection } from "../../contexts/WalletConnectionContext";

const ConnectWalletButton = ({ children }: { children?: React.ReactNode }) => {
  const { walletConnected, connectWallet, disconnectWallet } =
    useWalletConnection();

  return (
    <>
      {children}
      <Button
        rounded
        variant={walletConnected ? "danger" : "primary"}
        className="mr-4 bg"
        onClick={walletConnected ? disconnectWallet : connectWallet}
      >
        <span className="text-14 font-normal px-6">
          {walletConnected ? "Disconnect" : "Connect"} Wallet
        </span>
      </Button>
    </>
  );
};

export default ConnectWalletButton;
