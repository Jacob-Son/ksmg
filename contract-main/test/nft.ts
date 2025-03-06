import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { deploySetting } from "./helper/deploySetting";
import { expect } from "chai";
import { baseURI } from "./helper/constant";

describe("EbookNFT", function () {
  it("deploy test", async function () {
    const {
      nftCollection,
      owner,
      EbookFactory,
      EbookCore,
      collectionName,
      symbol,
    } = await loadFixture(deploySetting);
    expect(await nftCollection.collectionOwner()).to.equal(owner.address);
    expect(await nftCollection.factory()).to.equal(EbookFactory.address);
    expect(await nftCollection.coreAddress()).to.equal(EbookCore.address);
    expect(await nftCollection.name()).to.equal(collectionName);
    expect(await nftCollection.symbol()).to.equal(symbol);
  });
  it("mint test", async function () {
    const { nftCollection, account1, account2, relayer } = await loadFixture(
      deploySetting
    );
    const creator = account1.address;
    const recipient = account2.address;
    const tokenId = 1;
    const royalty = 5;
    await nftCollection
      .connect(relayer)
      .mint(creator, recipient, tokenId, royalty);
    expect(await nftCollection.ownerOf(tokenId)).to.equal(recipient);
    expect(await nftCollection.balanceOf(account2.address)).to.equal(1);
  });
  it("transfer test", async function () {
    const { nftCollection, account1, account2, relayer } = await loadFixture(
      deploySetting
    );
    const creator = account1.address;
    const recipient = account2.address;
    const tokenId = 1;
    const royalty = 5;
    await nftCollection
      .connect(relayer)
      .mint(creator, recipient, tokenId, royalty);
    expect(await nftCollection.ownerOf(tokenId)).to.equal(recipient);
    expect(await nftCollection.balanceOf(account2.address)).to.equal(1);
    await nftCollection.connect(relayer).transfer(creator, tokenId);
    expect(await nftCollection.ownerOf(tokenId)).to.equal(creator);
    expect(await nftCollection.balanceOf(account2.address)).to.equal(0);
    expect(await nftCollection.balanceOf(account1.address)).to.equal(1);
  });
  it("burn test", async function () {
    const { nftCollection, account1, account2, relayer } = await loadFixture(
      deploySetting
    );
    const creator = account1.address;
    const recipient = account2.address;
    const tokenId = 1;
    const royalty = 5;
    await nftCollection
      .connect(relayer)
      .mint(creator, recipient, tokenId, royalty);
    expect(await nftCollection.ownerOf(tokenId)).to.equal(recipient);
    expect(await nftCollection.balanceOf(account2.address)).to.equal(1);
    await nftCollection.connect(relayer).burn(tokenId);
    expect(await nftCollection.balanceOf(account2.address)).to.equal(0);
  });
  it("tokenURI test", async function () {
    const { nftCollection, account1, account2, relayer } = await loadFixture(
      deploySetting
    );
    const creator = account1.address;
    const recipient = account2.address;
    const tokenId = 1;
    const royalty = 5;
    await nftCollection
      .connect(relayer)
      .mint(creator, recipient, tokenId, royalty);
    const metadata =
      baseURI +
      "/metadata/" +
      String(nftCollection.address).toLowerCase() +
      tokenId;
    expect(await nftCollection.tokenURI(tokenId)).to.equal(metadata);
  });
  it("rolaylty check", async function () {
    const { nftCollection, account1, account2, relayer } = await loadFixture(
      deploySetting
    );
    const creator = account1.address;
    const recipient = account2.address;
    const tokenId = 1;
    const royalty = 5;
    await nftCollection
      .connect(relayer)
      .mint(creator, recipient, tokenId, royalty);
    expect(await nftCollection.getRoyalty(tokenId)).to.equal(royalty);
  });
  it("creator check", async function () {
    const { nftCollection, account1, account2, relayer } = await loadFixture(
      deploySetting
    );
    const creator = account1.address;
    const recipient = account2.address;
    const tokenId = 1;
    const royalty = 5;
    await nftCollection
      .connect(relayer)
      .mint(creator, recipient, tokenId, royalty);
    expect(await nftCollection.getCreator(tokenId)).to.equal(creator);
  });
  it("owner check", async function () {
    const { nftCollection, account1, account2, relayer } = await loadFixture(
      deploySetting
    );
    const creator = account1.address;
    const recipient = account2.address;
    const tokenId = 1;
    const royalty = 5;
    await nftCollection
      .connect(relayer)
      .mint(creator, recipient, tokenId, royalty);
    expect(await nftCollection.ownerOf(tokenId)).to.equal(recipient);
  });
});
