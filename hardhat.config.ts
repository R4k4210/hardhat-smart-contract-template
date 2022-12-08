import dotenv from "dotenv";
import ethers from "ethers";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";

dotenv.config();

const mnemonic = process.env.MNEMONIC ?? "";
const privateKey = process.env.PRIVATE_KEY ?? "";
const infuraApiKey = process.env.INFURA_API_KEY ?? "";
const mainnet_etherscanApiKey = process.env.MAINNET_ETHERSCAN_API_KEY ?? "";
const goerli_etherscanApiKey = process.env.GOERLI_ETHERSCAN_API_KEY ?? "";

if (!mnemonic && !privateKey) {
  throw Error("No mnemonic nor private key found.");
}

if (!infuraApiKey) {
  throw Error("No Infura API key found.");
}

const gasPrice = parseInt(String(ethers.utils.parseUnits("5", "gwei")));

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  defaultNetwork: "hardhat", //default chain id: 31337
  networks: {
    hardhat: {
      chainId: 666,
      gasPrice: gasPrice,
      gas: 6000000,
      // This is used to fork mainnet and test same conditions.
      // In order to use this, you need to connect to an Archive Node.
      // An API key is needed as well. https://alchemyapi.io/
      //  forking: {
      //    url: "https://eth-mainnet.alchemyapi.io/v2/<key>",
      //    blockNumber: 14390000, //To pin and cache a block. 20X faster.
      //    httpHeaders: {
      //       "Authorization": "Bearer <key>"
      //    }
      //  },
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${infuraApiKey}`,
      chainId: 5,
      accounts: mnemonic ? { mnemonic } : [privateKey],
      gasPrice: gasPrice,
      gas: 6000000,
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${infuraApiKey}`,
      chainId: 5,
      accounts: mnemonic ? { mnemonic } : [privateKey],
      gasPrice: gasPrice,
      gas: 6000000,
    },
  },
  etherscan: {
    apiKey: {
      goerli: goerli_etherscanApiKey,
      mainnet: mainnet_etherscanApiKey,
    },
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 40000,
  },
};

export default config;
