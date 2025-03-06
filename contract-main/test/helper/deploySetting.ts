import { ethers, upgrades } from "hardhat";
import {
  EbookCollectionFactory,
  EbookCore,
  EbookMarket,
  EbookNFTCollection,
} from "../../typechain-types";
import { baseURI } from "./constant";

export async function deploySetting() {
  const [owner, account1, account2, account3, account4, relayer] =
    await ethers.getSigners();

  /**
   * ========
   * Deploy
   * ========
   */

  const coretoken = await ethers.getContractFactory("EbookCore");
  const EbookCore = (await upgrades.deployProxy(coretoken, [])) as EbookCore;
  await EbookCore.deployed();

  const factoryToken = await ethers.getContractFactory(
    "EbookCollectionFactory"
  );
  const EbookFactory = (await upgrades.deployProxy(factoryToken, [
    EbookCore.address,
    baseURI,
  ])) as EbookCollectionFactory;
  await EbookFactory.deployed();

  const collectionToken = await ethers.getContractFactory("EbookNFTCollection");
  const EbookNFTCollection =
    (await collectionToken.deploy()) as EbookNFTCollection;
  await EbookNFTCollection.deployed();

  const collectionName = "EbookCollection";
  const symbol = "EBC";

  const marketToken = await ethers.getContractFactory("EbookMarket");
  const EbookMarket = (await upgrades.deployProxy(marketToken, [
    EbookCore.address,
  ])) as EbookMarket;
  await EbookMarket.deployed();

  /**
   * ========
   * Setting
   * ========
   */

  await EbookCore.addRelayer(relayer.address);
  await EbookCore.addRelayer(owner.address);
  // 꼭 마켓도 relayer 등록해줘야함(mint,transfer하기 위해)
  await EbookCore.addRelayer(EbookMarket.address);

  await EbookFactory.setCollectionImplementation(EbookNFTCollection.address);

  /**
   * ========
   * Collection deploy
   * ========
   */
  const salt = 0;
  await EbookFactory.createCollection(
    collectionName,
    symbol,
    owner.address,
    salt
  );
  const collectionAddress = await EbookFactory.getCollectionAddress(
    collectionName,
    symbol,
    owner.address,
    salt
  );

  const nftCollection = EbookNFTCollection.attach(collectionAddress);

  return {
    owner,
    account1,
    account2,
    account3,
    account4,
    relayer,
    EbookCore,
    EbookMarket,
    nftCollection,
    EbookNFTCollection,
    EbookFactory,
    collectionName,
    symbol,
  };
}
