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
        variant={"outline"}
        className="mr-4"
        onClick={walletConnected ? disconnectWallet : connectWallet}
      >
        {walletConnected ? "Disconnect" : "Connect"} Wallet
      </Button>
    </>
  );
};

export default ConnectWalletButton;
