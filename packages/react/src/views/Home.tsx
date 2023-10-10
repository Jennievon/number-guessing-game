import Button from "../components/Buttons";
import { useWalletConnection } from "../contexts/WalletConnectionContext";
import Guess from "./Guess";

const Home = () => {
  const { walletConnected, connectWallet } = useWalletConnection();

  return (
    <div>
      {walletConnected ? (
        <Guess />
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
