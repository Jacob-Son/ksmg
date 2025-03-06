import { ethers, upgrades } from "hardhat";

async function main() {
  if (!process.env.EBOOK_MARKET_ADDRESS) {
    throw new Error("Please set EBOOK_MARKET_ADDRESS");
  }

  const marketToken = await ethers.getContractFactory("EbookMarket");

  const tx = await upgrades.upgradeProxy(
    process.env.EBOOK_MARKET_ADDRESS,
    marketToken,
    {
      pollingInterval: 1000,
      timeout: 0,
    }
  );
  console.log(tx);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
