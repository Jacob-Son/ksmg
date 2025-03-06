import { ethers, upgrades } from "hardhat";
import { EbookCore } from "../typechain-types";

describe("EbookCore", function () {
  it("should be able to deploy", async function () {
    const coretoken = await ethers.getContractFactory("EbookCore");
    const EbookCore = (await upgrades.deployProxy(coretoken, [])) as EbookCore;
    await EbookCore.deployed();
  });
});
