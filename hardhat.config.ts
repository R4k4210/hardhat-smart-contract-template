import { ethers } from "ethers";
import dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "./tasks";

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
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      // 1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
      // 4: "0x84b9514E013710b9dD0811c9Fe46b837a4A0d8E0", // but for rinkeby it will be a specific address
      // goerli: "0x84b9514E013710b9dD0811c9Fe46b837a4A0d8E0", // it can also specify a specific netwotk name (specified in hardhat.config.js)
    },
    // feeCollector:{
    //    ...
    // }
  },
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
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
