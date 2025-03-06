import { ethers } from "hardhat";
import { EbookNFTCollection } from "../../typechain-types";

async function main() {
  const collectionToken = await ethers.getContractFactory("EbookNFTCollection");
  const EbookNFTCollection =
    (await collectionToken.deploy()) as EbookNFTCollection;
  await EbookNFTCollection.deployed();

  console.log("EBOOK SOURCE Address: ", EbookNFTCollection.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
