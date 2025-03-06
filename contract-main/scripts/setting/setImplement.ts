import { ethers, upgrades } from "hardhat";
import { EbookCollectionFactory, EbookCore } from "../../typechain-types";
import { baseURI } from "../../test/helper/constant";

async function main() {
  if (!process.env.EBOOK_SOURCE_ADDRESS || !process.env.EBOOK_FACTORY_ADDRESS) {
    throw new Error("EBOOK_SOURCE_ADDRESS,EBOOK_FACTORY_ADDRESS is not set");
  }

  const EbookCollectionFactory = await ethers.getContractAt(
    "EbookCollectionFactory",
    process.env.EBOOK_FACTORY_ADDRESS
  );

  let txHash = [];
  txHash.push(
    (
      await EbookCollectionFactory.setCollectionImplementation(
        process.env.EBOOK_SOURCE_ADDRESS
      )
    ).hash
  );
  console.log("txHash: ", txHash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
