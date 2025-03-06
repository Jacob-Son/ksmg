import { ethers, upgrades } from "hardhat";
import { EbookCollectionFactory } from "../../typechain-types";
import { baseURI } from "../../test/helper/constant";

async function main() {
  if (!process.env.EBOOK_CORE_ADDRESS) {
    throw new Error("EBOOK_CORE_ADDRESS is not set");
  }

  const EbookCore = await ethers.getContractAt(
    "EbookCore",
    process.env.EBOOK_CORE_ADDRESS
  );

  const factoryToken = await ethers.getContractFactory(
    "EbookCollectionFactory"
  );
  const EbookCollectionFactory = (await upgrades.deployProxy(
    factoryToken,
    [EbookCore.address, baseURI],
    { timeout: 0 }
  )) as EbookCollectionFactory;
  await EbookCollectionFactory.deployed();

  console.log(
    "EbookCollectionFactory Address: ",
    EbookCollectionFactory.address
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
