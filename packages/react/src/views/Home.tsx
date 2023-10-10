import Button from "../components/Buttons";
import { useWalletConnection } from "../contexts/WalletConnectionContext";
import Dashboard from "./Dashboard";

const Home = () => {
  const { walletConnected, walletAddress, connectWallet } =
    useWalletConnection();

  return (
    <div>
      {walletConnected ? (
        <Dashboard />
      ) : (
        <div>
          <h2>Connect Wallet</h2>
          <Button onClick={connectWallet}>Connect Wallet</Button>
        </div>
      )}
    </div>
  );
};

export default Home;
