import { ethers } from "ethers";

// Replace with your Ethereum node URL
const provider = new ethers.providers.JsonRpcProvider("YOUR_ETHEREUM_NODE_URL");

type Transaction = {
  txHash: string;
  blockHash: string;
  status: number;
  gasPrice: ethers.BigNumber;
  gasLimit: ethers.BigNumber;
  value: ethers.BigNumber;
  hash: string;
  errorMessage: string;
};

async function getTransactions() {
  const address = "YOUR_WALLET_ADDRESS";

  // Get all transactions sent from your wallet address
  // @ts-ignore
  const allTxs = await provider.getHistory(address);

  // Filter transactions based on your criteria
  const failedTxs = allTxs.filter((tx: Transaction) => tx.status === 0); // Failed transactions
  const unsignedTxs = allTxs.filter((tx: Transaction) => !tx.blockHash); // Unsigned transactions
  const insufficientFeeTxs = allTxs.filter(
    (tx: Transaction) => tx.gasPrice.mul(tx.gasLimit).lt(tx.value) // Insufficient fee transactions
  );

  // Retrieve error messages for failed transactions
  const failedTxsWithErrorMessages = await Promise.all(
    failedTxs.map(async (tx: Transaction) => {
      try {
        // Get the transaction receipt to access the error message
        const txReceipt = await provider.getTransactionReceipt(tx.hash);
        return {
          txHash: tx.hash,
          errorMessage: txReceipt && txReceipt.logs[0].data,
        };
      } catch (error) {
        console.error("Error fetching receipt:", error);
        return {
          txHash: tx.hash,
          errorMessage: "Error fetching receipt",
        };
      }
    })
  );

  return {
    failedTransactions: failedTxsWithErrorMessages,
    unsignedTransactions: unsignedTxs,
    insufficientFeeTransactions: insufficientFeeTxs,
    successfulTransactions: allTxs.filter((tx: Transaction) => tx.status === 1), // Successful transactions
  };
}

getTransactions()
  .then((transactions) => {
    console.log("Failed Transactions:", transactions.failedTransactions);
    console.log("Unsigned Transactions:", transactions.unsignedTransactions);
    console.log(
      "Insufficient Fee Transactions:",
      transactions.insufficientFeeTransactions
    );
    console.log(
      "Successful Transactions:",
      transactions.successfulTransactions
    );
  })
  .catch((error) => {
    console.error("Error:", error);
  });
