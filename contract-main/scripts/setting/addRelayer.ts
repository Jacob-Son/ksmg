import { ethers, upgrades } from "hardhat";
import { EbookCollectionFactory, EbookCore } from "../../typechain-types";
import { baseURI } from "../../test/helper/constant";

async function main() {
  if (
    !process.env.EBOOK_CORE_ADDRESS ||
    !process.env.EBOOK_ADMIN_ADDRESS
    // || !process.env.EBOOK_MARKET_ADDRESS
  ) {
    throw new Error(
      "EBOOK_CORE_ADDRESS,EBOOK_ADMIN_ADDRESS,EBOOK_MARKET_ADDRESS is not set"
    );
  }

  const EbookCore = await ethers.getContractAt(
    "EbookCore",
    process.env.EBOOK_CORE_ADDRESS
  );

  let txHash = [];
  txHash.push(
    (await EbookCore.addRelayer(process.env.EBOOK_ADMIN_ADDRESS)).hash
  );
  // txHash.push(
  //   (await EbookCore.addRelayer(process.env.EBOOK_MARKET_ADDRESS)).hash
  // );
  console.log("txHash: ", txHash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
