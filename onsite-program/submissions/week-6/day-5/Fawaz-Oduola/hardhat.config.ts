import type { HardhatUserConfig } from "hardhat/config";

import hardhatToolboxMochaEthersPlugin from "@nomicfoundation/hardhat-toolbox-mocha-ethers";
import { configVariable } from "hardhat/config";

const config: HardhatUserConfig = {
  plugins: [hardhatToolboxMochaEthersPlugin],
  solidity: {
    profiles: {
      default: {
        version: "0.8.28",
      },
      production: {
        version: "0.8.28",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    },
  },
  networks: {
    hardhatMainnet: {
      type: "edr-simulated",
      chainType: "l1",
    },
    hardhatOp: {
      type: "edr-simulated",
      chainType: "op",
    },
    sepolia: {
      type: "http",
      chainType: "l1",
      url: configVariable("SEPOLIA_RPC_URL"),
      accounts: [configVariable("SEPOLIA_PRIVATE_KEY")],
    },
    "lisk-sepolia": {
      type: "http",
      chainType: "op",
      url: configVariable("LISK_SEPOLIA_RPC_URL"),
      accounts: [configVariable("SEPOLIA_PRIVATE_KEY")],
      
    },
  },
  verify: {
    etherscan: {
      apiKey: "YOUR_ETHERSCAN_API_KEY",
    },
    blockscout: {
      enabled: true
    }
  },
  chainDescriptors: {
    4202: {
      name: "lisk-sepolia",
      blockExplorers: {
        etherscan: {
          name: "BlockscoutSepolia",
          url: "https://sepolia-blockscout.lisk.com",
          apiUrl: "https://sepolia-blockscout.lisk.com/api",
        },
      },
    },
  }
};

export default config;
