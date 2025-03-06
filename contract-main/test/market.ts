import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { deploySetting } from "./helper/deploySetting";
import { ethers, upgrades } from "hardhat";
import { EbookMarket } from "../typechain-types";
import { expect } from "chai";

describe("EbookMarket", function () {
  it("should be able to deploy", async function () {
    const { EbookCore } = await loadFixture(deploySetting);
    const marketToken = await ethers.getContractFactory("EbookMarket");
    const EbookMarket = (await upgrades.deployProxy(marketToken, [
      EbookCore.address,
    ])) as EbookMarket;
    await EbookMarket.deployed();
  });
  it("lazy mint buy test", async function () {
    const { EbookMarket, account1, account2, nftCollection, relayer } =
      await loadFixture(deploySetting);
    const buyer = account2.address;
    const buyInfo1 = {
      collectionAddress: nftCollection.address,
      creator: account1.address,
      // creator와 seller가 동일함
      seller: account1.address,
      tokenId: 1,
      royalty: 5,
      price: 10000,
    };

    const totalPrice = buyInfo1.price;

    const messageHash = ethers.utils.solidityKeccak256(
      ["address", "uint256"],
      [buyer, totalPrice]
    );
    // buyer signature
    const userSignature = await account2.signMessage(
      ethers.utils.arrayify(messageHash)
    );
    const relayerSignature = await relayer.signMessage(
      ethers.utils.arrayify(messageHash)
    );
    await EbookMarket.connect(relayer).buy(
      buyer,
      [
        {
          collectionAddress: buyInfo1.collectionAddress,
          creator: buyInfo1.creator,
          seller: buyInfo1.seller,
          tokenId: buyInfo1.tokenId,
          royalty: buyInfo1.royalty,
          price: buyInfo1.price,
          orderType: 0, // lazy mint
        },
      ],
      totalPrice,
      {
        relayer: relayer.address,
        userSignature: userSignature,
        relayerSignature: relayerSignature,
      }
    );
    expect(await nftCollection.ownerOf(buyInfo1.tokenId)).to.equal(buyer);
    expect(await nftCollection.balanceOf(account2.address)).to.equal(1);
  });
  it("mint buy test", async function () {
    const { EbookMarket, account1, account2, nftCollection, relayer } =
      await loadFixture(deploySetting);
    const buyer = account2.address;
    const buyInfo1 = {
      collectionAddress: nftCollection.address,
      creator: account1.address,
      // creator와 seller가 다름
      seller: account2.address,
      tokenId: 1,
      royalty: 5,
      price: 10000,
    };
    // test mint(mint된 거 buy test를 위해)
    await nftCollection
      .connect(relayer)
      .mint(
        buyInfo1.creator,
        buyInfo1.seller,
        buyInfo1.tokenId,
        buyInfo1.royalty
      );

    const totalPrice = buyInfo1.price;

    const messageHash = ethers.utils.solidityKeccak256(
      ["address", "uint256"],
      [buyer, totalPrice]
    );
    // buyer signature
    const userSignature = await account2.signMessage(
      ethers.utils.arrayify(messageHash)
    );
    const relayerSignature = await relayer.signMessage(
      ethers.utils.arrayify(messageHash)
    );
    await EbookMarket.connect(relayer).buy(
      buyer,
      [
        {
          ...buyInfo1,
          orderType: 1, //  mint
        },
      ],
      totalPrice,
      {
        relayer: relayer.address,
        userSignature: userSignature,
        relayerSignature: relayerSignature,
      }
    );
    expect(await nftCollection.ownerOf(buyInfo1.tokenId)).to.equal(buyer);
    expect(await nftCollection.balanceOf(account2.address)).to.equal(1);
  });
  it("many nft buy scenario", async function () {
    const {
      EbookMarket,
      account1,
      account2,
      account3,
      nftCollection,
      relayer,
    } = await loadFixture(deploySetting);
    const buyer = account2.address;
    // ordertype: lazy mint
    const buyInfo1 = {
      collectionAddress: nftCollection.address,
      creator: account1.address,
      seller: account1.address,
      tokenId: 1,
      royalty: 5,
      price: 10000,
    };
    // ordertype: buy
    const buyInfo2 = {
      collectionAddress: nftCollection.address,
      creator: account1.address,
      seller: account2.address,
      tokenId: 2,
      royalty: 6,
      price: 200000,
    };
    // ordertype: buy
    const buyInfo3 = {
      collectionAddress: nftCollection.address,
      creator: account1.address,
      seller: account3.address,
      tokenId: 3,
      royalty: 8,
      price: 300000,
    };

    // test mint(mint된 거 buy test를 위해)
    await nftCollection
      .connect(relayer)
      .mint(
        buyInfo3.creator,
        buyInfo3.seller,
        buyInfo3.tokenId,
        buyInfo3.royalty
      );
    await nftCollection
      .connect(relayer)
      .mint(
        buyInfo2.creator,
        buyInfo2.seller,
        buyInfo2.tokenId,
        buyInfo2.royalty
      );

    const totalPrice = buyInfo1.price + buyInfo2.price + buyInfo3.price;

    const messageHash = ethers.utils.solidityKeccak256(
      ["address", "uint256"],
      [buyer, totalPrice]
    );
    // buyer signature
    const userSignature = await account2.signMessage(
      ethers.utils.arrayify(messageHash)
    );
    const relayerSignature = await relayer.signMessage(
      ethers.utils.arrayify(messageHash)
    );

    await EbookMarket.connect(relayer).buy(
      buyer,
      [
        {
          ...buyInfo1,
          orderType: 0, // lazy mint
        },
        {
          ...buyInfo2,
          orderType: 1, // buy
        },
        {
          ...buyInfo3,
          orderType: 1,
        },
      ],
      totalPrice,
      {
        relayer: relayer.address,
        userSignature: userSignature,
        relayerSignature: relayerSignature,
      }
    );
    expect(await nftCollection.ownerOf(buyInfo1.tokenId)).to.equal(buyer);
    expect(await nftCollection.ownerOf(buyInfo2.tokenId)).to.equal(buyer);
    expect(await nftCollection.ownerOf(buyInfo3.tokenId)).to.equal(buyer);
    expect(await nftCollection.balanceOf(account2.address)).to.equal(3);
  });
});
