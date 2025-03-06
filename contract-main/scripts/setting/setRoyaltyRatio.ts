import { ethers } from "hardhat";
import { EbookMarket } from "../../typechain-types";

async function main() {
  if (!process.env.EBOOK_MARKET_ADDRESS) {
    throw new Error("EBOOK_MARKET_ADDRESS is not set");
  }

  const EbookMarket = (await ethers.getContractAt(
    "EbookMarket",
    process.env.EBOOK_MARKET_ADDRESS
  )) as EbookMarket;

  let txHash = [];
  txHash.push(
    (
      await EbookMarket.setPlatformRoyaltyRatio(
        1000 // 10%
      )
    ).hash
  );
  console.log("txHash: ", txHash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
