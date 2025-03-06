import { ethers, upgrades } from "hardhat";
import { EbookCore } from "../../typechain-types";

async function main() {
  const coreToken = await ethers.getContractFactory("EbookCore");
  const EbookCore = (await upgrades.deployProxy(coreToken, [], {
    timeout: 0,
  })) as EbookCore;
  await EbookCore.deployed();

  console.log("EbookCore Address: ", EbookCore.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
