// scripts/mint/mintToCollection.ts
import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const collectionAddress = "0x2C419D78d9FF38101EF4CC2B9896A4554329653D";

  const EbookNFTCollection = await ethers.getContractAt(
    "EbookNFTCollection",
    collectionAddress
  );

  const creator = process.env.EBOOK_ADMIN_ADDRESS!;
  const recipient = process.env.EBOOK_ADMIN_ADDRESS!;
  const tokenId = 1;
  const royalty = 500; // 5%

  const tx = await EbookNFTCollection.mint(
    creator,
    recipient,
    tokenId,
    royalty
  );
  console.log("✅ Minted. TxHash:", tx.hash);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
