// scripts/setting/checkRelayer.ts

import { ethers } from "hardhat";
import * as dotenv from "dotenv";

dotenv.config();

async function main() {
  if (!process.env.EBOOK_CORE_ADDRESS || !process.env.RELAYER_ADDRESS) {
    throw new Error("EBOOK_CORE_ADDRESS or RELAYER_ADDRESS is not set");
  }

  const EbookCore = await ethers.getContractAt(
    "EbookCore",
    process.env.EBOOK_CORE_ADDRESS
  );

  const isRelayer = await EbookCore.isRelayer(process.env.RELAYER_ADDRESS);
  console.log(
    `Relayer ${process.env.RELAYER_ADDRESS} registered? ${isRelayer}`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
