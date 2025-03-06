import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { ethers, upgrades } from "hardhat";
import { deploySetting } from "./helper/deploySetting";
import { EbookCollectionFactory } from "../typechain-types";
import { baseURI } from "./helper/constant";
import { expect } from "chai";

describe("EbookFactory", function () {
  it("should be able to deploy", async function () {
    const { EbookCore } = await loadFixture(deploySetting);
    const factoryToken = await ethers.getContractFactory(
      "EbookCollectionFactory"
    );
    const EbookFactory = (await upgrades.deployProxy(factoryToken, [
      EbookCore.address,
      baseURI,
    ])) as EbookCollectionFactory;
    await EbookFactory.deployed();
  });

  it("should be able to create collection", async function () {
    const { EbookFactory, account1, EbookNFTCollection } = await loadFixture(
      deploySetting
    );

    const collectionName = "EbookCollection2";
    const symbol = "EBC2";
    const salt = 1;

    const collectionAddress = await EbookFactory.getCollectionAddress(
      collectionName,
      symbol,
      account1.address,
      salt
    );
    await EbookFactory.createCollection(
      collectionName,
      symbol,
      account1.address,
      salt
    );

    const collection = EbookNFTCollection.attach(collectionAddress);
    expect(await collection.getCollectionOwner()).to.equal(account1.address);
  });
});
