// scripts/check/checkCore.ts
import { ethers } from "hardhat";
import * as dotenv from "dotenv";
dotenv.config();

async function main() {
  const coreAddr = process.env.EBOOK_CORE_ADDRESS;
  if (!coreAddr) throw new Error("EBOOK_CORE_ADDRESS is missing");

  const EbookCore = await ethers.getContractAt("EbookCore", coreAddr);
  console.log("✅ EbookCore deployed at:", EbookCore.address);

  const isRelayer = await EbookCore.isRelayer(process.env.RELAYER_ADDRESS);
  console.log(`RELAYER registered? ${isRelayer}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
