require("dotenv").config({ path: ".env" });
require("hardhat-deploy");
const { task } = require("hardhat/config");
require("hardhat-celo");

const { APP_DEV_PK, END_USR_PK, ARB_API_KEY } = process.env;

const defaultNetwork = "hardhat";

const DEVCHAIN_MNEMONIC =
  "concert load couple harbor equip island argue ramp clarify fence smart topic";

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork,
  namedAccounts: {
    app_developer: {
      default: 0,
    },
    end_user: {
      default: 1,
    },
  },
  networks: {
    obscuro: {
      deploy: ["scripts/"],
      chainId: 443,
      url: "http://127.0.0.1:3000/v1/",
      gasPrice: 2000000000,
      accounts: [`0x${APP_DEV_PK}`, `0x${END_USR_PK}`],
    },
    arbitrum: {
      deploy: ["scripts/"],
      chainId: 421613,
      url: `https://arb-goerli.g.alchemy.com/v2/${ARB_API_KEY}`,
      gasPrice: 100000000,
      accounts: [`0x${APP_DEV_PK}`, `0x${END_USR_PK}`],
    },
    hardhat: {
      deploy: ["scripts/"],
      chainId: 1337,
      accounts: [
        { privateKey: `0x${APP_DEV_PK}`, balance: "174165200000000000" },
        { privateKey: `0x${END_USR_PK}`, balance: "174165200000000000" },
      ],
    },
  },
  solidity: {
    version: "0.8.19",
  },
  /**
   * Named Accounts become available as variable names in scripts
   * Learn more: https://github.com/wighawag/hardhat-deploy#1-namedaccounts-ability-to-name-addresses
   */
  //   namedAccounts: {
  //     deployer: 0,
  //     alice: 1,
  //     bob: 2,
  //   },
  typechain: {
    outDir: "types",
    target: "web3-v1",
    alwaysGenerateOverloads: false, // should overloads with full signatures like deposit(uint256) be generated always, even if there are no overloads?
    externalArtifacts: ["externalArtifacts/*.json"], // optional array of glob patterns with external artifacts to process (for example external libs from node_modules)
  },
};

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task(
  "devchain-keys",
  "Prints the private keys associated with the devchain",
  async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners();
    const hdNode = hre.ethers.utils.HDNode.fromMnemonic(DEVCHAIN_MNEMONIC);
    for (let i = 0; i < accounts.length; i++) {
      const account = hdNode.derivePath(`m/44'/60'/0'/0/${i}`);
      console.log(
        `Account ${i}\nAddress: ${account.address}\nKey: ${account.privateKey}`
      );
    }
  }
);

task("create-account", "Prints a new private key", async (taskArgs, hre) => {
  const wallet = new hre.ethers.Wallet.createRandom();
  console.log(`PRIVATE_KEY="` + wallet.privateKey + `"`);
  console.log(`Your account address: `, wallet.address);
});

task(
  "print-account",
  "Prints the address of the account associated with the private key in .env file",
  (taskArgs, hre) => {
    const wallet = new hre.ethers.Wallet(process.env.PRIVATE_KEY);
    console.log(`Account: `, wallet.address);
  }
);
