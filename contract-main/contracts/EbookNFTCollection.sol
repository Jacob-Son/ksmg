// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/StringsUpgradeable.sol";

import "./core/EbookContract.sol";
import "./interface/IEbookNFTCollection.sol";
import "./interface/IEbookCollectionFactory.sol";
import "./interface/IEbookCore.sol";

contract EbookNFTCollection is
    IEbookNFTCollection,
    ERC721BurnableUpgradeable,
    EbookContract
{
    using StringsUpgradeable for uint256;

    address public factory;
    address public collectionOwner;

    mapping(uint256 => NFTInfo) public nftInfo;

    struct NFTInfo {
        address creator;
        uint96 creatorRoyalty;
    }

    function initialize(
        string memory _name,
        string memory _symbol,
        address _owner,
        address _coreAddress,
        address _factory
    ) public initializer {
        __ERC721_init(_name, _symbol);
        __EbookContract_init(_coreAddress);
        collectionOwner = _owner;
        factory = _factory;
    }

    function mint(
        address _creator,
        address _recipient,
        uint256 _tokenId,
        uint256 _creatorRoyalty
    ) public onlyRelayer {
        _mint(_recipient, _tokenId);
        nftInfo[_tokenId] = NFTInfo(_creator, uint96(_creatorRoyalty));
    }

    function burn(
        uint256 tokenId
    )
        public
        override(ERC721BurnableUpgradeable, IEbookNFTCollection)
        onlyRelayer
    {
        _burn(tokenId);
    }

    function transfer(address to, uint256 id) public onlyRelayer {
        address from = ownerOf(id);
        _transfer(from, to, id);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721Upgradeable) returns (string memory) {
        require(
            _exists(tokenId),
            "ERC721Metadata: URI query for nonexistent token"
        );
        return
            string(
                abi.encodePacked(
                    baseURI(),
                    "/metadata/",
                    StringsUpgradeable.toHexString(
                        uint256(uint160(address(this))),
                        20
                    ),
                    tokenId.toString()
                )
            );
    }

    function baseURI() public view returns (string memory) {
        return IEbookCollectionFactory(factory).getBaseURI();
    }

    function _baseURI() internal view override returns (string memory) {
        return IEbookCollectionFactory(factory).getBaseURI();
    }

    function ownerOf(
        uint256 tokenId
    )
        public
        view
        override(ERC721Upgradeable, IEbookNFTCollection)
        returns (address)
    {
        return super.ownerOf(tokenId);
    }

    function exists(uint256 tokenId) public view returns (bool) {
        return _exists(tokenId);
    }

    function getNFTInfo(
        uint256 _tokenId
    ) public view returns (address, uint256) {
        return (nftInfo[_tokenId].creator, nftInfo[_tokenId].creatorRoyalty);
    }

    function getRoyalty(uint256 _tokenId) public view returns (uint96) {
        return nftInfo[_tokenId].creatorRoyalty;
    }

    function getCreator(uint256 _tokenId) public view returns (address) {
        return nftInfo[_tokenId].creator;
    }

    function getCollectionOwner() public view returns (address) {
        return collectionOwner;
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721Upgradeable) {
        require(
            IEbookCore(coreAddress).isRelayer(msg.sender),
            "EbookNFTCollection: Only relayer can transfer"
        );
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    uint256[47] private __gap;
}
