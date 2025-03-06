import { ethers } from "hardhat";

async function main() {
  if (!process.env.EBOOK_FACTORY_ADDRESS || !process.env.EBOOK_ADMIN_ADDRESS) {
    throw new Error("EBOOK_FACTORY_ADDRESS,EBOOK_ADMIN_ADDRESS is not set");
  }

  const EbookCollectionFactory = await ethers.getContractAt(
    "EbookCollectionFactory",
    process.env.EBOOK_FACTORY_ADDRESS
  );

  const salt = 1;
  const collectionName = "Ebook";
  const symbol = "EBK";

  const res = await EbookCollectionFactory.createCollection(
    collectionName,
    symbol,
    process.env.EBOOK_ADMIN_ADDRESS,
    salt
  );
  console.log("create collection tx hash: ", res.hash);
  const collectionAddress = await EbookCollectionFactory.getCollectionAddress(
    collectionName,
    symbol,
    process.env.EBOOK_ADMIN_ADDRESS,
    salt
  );
  console.log("collectionAddress: ", collectionAddress);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
