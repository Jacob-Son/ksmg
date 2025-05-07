// scripts/check/checkFactory.ts
import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const factoryAddr = process.env.EBOOK_FACTORY_ADDRESS;
  if (!factoryAddr) throw new Error("EBOOK_FACTORY_ADDRESS is missing");

  const factory = await ethers.getContractAt(
    "EbookCollectionFactory",
    factoryAddr
  );
  const uri = await factory.getBaseURI();
  console.log("✅ Base URI:", uri);

  const impl = await factory.collectionImplementation();
  console.log("📦 Implementation:", impl);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
