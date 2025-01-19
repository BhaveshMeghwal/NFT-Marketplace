// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

// const marketplaceAddress = "0xYourMarketplaceAddressHere";
const DEFAULT_FEE_PERCENT = 1;

module.exports = buildModule("LockModule", (m) => {

  const feePercent = m.getParameter("feePercent", DEFAULT_FEE_PERCENT);

  const nft = m.contract("NFT");
  const marketplace = m.contract("Marketplace", [feePercent]);

   // Log contract addresses and parameters
  //  console.log("NFT Contract Address:", nft.address);
  //  console.log("Marketplace Contract Address:", marketplace.address);
  //  console.log("Fee Percent:", feePercent);

  return {nft, marketplace};
});
