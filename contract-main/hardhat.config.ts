import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import "hardhat-gas-reporter";
import "hardhat-abi-exporter";
import dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 100,
      },
    },
  },
  gasReporter: {
    gasPriceApi:
      "https://api.etherscan.io/api?module=proxy&action=eth_gasPrice",
    enabled: true,
  },
  defaultNetwork: "hardhat",
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY,
  },
  networks: {
    hardhat: {},
    amoy: {
      url: "https://rpc-amoy.polygon.technology/",
      accounts: [process.env.EBOOK_DEPLOYER_PK || ""],
      chainId: 80002, // Amoy Testnet의 Chain ID
      gasPrice: 30000000000, // 25 Gwei (최소 요구되는 가스 가격 설정)
    },
    polygon: {
      url: "https://polygon-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY",
      accounts: [process.env.EBOOK_DEPLOYER_PK || ""],
      chainId: 137,
    },
  },
};

export default config;
