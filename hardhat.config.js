require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  paths: {
    artifacts: "./artifacts",
    // sources: "./src/backend/contracts",
    // cache: "./src/backend/cache",
    // tests: "./src/backend/test"
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
  },
};
