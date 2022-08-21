require("@nomiclabs/hardhat-waffle");
require('dotenv').config();
require('solidity-coverage')
require("@nomiclabs/hardhat-etherscan")

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const { API_URL, PRIVATE_KEY, POLYGONSCAN_API_KEY  } = process.env;
const defaultNetwork = "polygon_mumbai"
// const defaultNetwork = "hardhat"

module.exports = {
  defaultNetwork: `${defaultNetwork}`,
  networks: {
    hardhat: {},
    polygon_mumbai: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`]
   }
  },
  solidity: {
    version :"0.8.7",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  etherscan: {
    apiKey: `${POLYGONSCAN_API_KEY}`
  },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts"
  },
};
