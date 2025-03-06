import { ethers, upgrades } from "hardhat";
import { EbookMarket } from "../../typechain-types";

async function main() {
  if (!process.env.EBOOK_CORE_ADDRESS) {
    throw new Error("EBOOK_CORE_ADDRESS is not set");
  }

  const EbookCore = await ethers.getContractAt(
    "EbookCore",
    process.env.EBOOK_CORE_ADDRESS
  );

  const collectionName = "EbookCollection";
  const symbol = "EBC";

  const marketToken = await ethers.getContractFactory("EbookMarket");
  const EbookMarket = (await upgrades.deployProxy(
    marketToken,
    [EbookCore.address],
    { timeout: 0 }
  )) as EbookMarket;
  await EbookMarket.deployed();

  console.log("EbookMarket Address: ", EbookMarket.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
