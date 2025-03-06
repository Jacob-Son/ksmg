import { ethers, upgrades } from "hardhat";

async function main() {
  if (!process.env.EBOOK_NFT_COLLECTION_ADDRESS) {
    throw new Error("Please set EBOOK_NFT_COLLECTION_ADDRESS");
  }

  const collectionToken = await ethers.getContractFactory("EbookNFTCollection");

  const tx = await upgrades.upgradeProxy(
    process.env.EBOOK_NFT_COLLECTION_ADDRESS,
    collectionToken,
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
