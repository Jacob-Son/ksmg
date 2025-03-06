// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol";

import "./core/EbookContract.sol";
import "./interface/IEbookCore.sol";
import "./interface/IEbookNFTCollection.sol";

contract EbookMarket is Initializable, EbookContract {
    using ECDSAUpgradeable for bytes32;

    uint256 public platformRoyaltyRatio;

    uint256 public platformRoyalty;
    mapping(address => uint256) public creatorRoyalty;
    Order[] public orders;

    enum OrderType {
        LazyMint,
        Buy
    }

    struct BuyNFTInfo {
        OrderType orderType;
        address collectionAddress;
        address creator;
        address seller;
        uint256 tokenId;
        uint96 royalty;
        uint256 price;
    }

    struct ValidateInfo {
        address relayer;
        bytes userSignature;
        bytes relayerSignature;
    }

    struct Order {
        address collectionAddress;
        address creator;
        address seller;
        address buyer;
        uint256 tokenId;
        uint256 price;
        uint96 royalty;
    }

    event OrderCreated(
        address collectionAddress,
        address creator,
        address seller,
        address buyer,
        uint256 tokenId,
        uint256 price,
        uint96 royalty
    );

    function initialize(address _coreAddress) public initializer {
        __EbookContract_init(_coreAddress);
    }

    function buy(
        address buyer,
        BuyNFTInfo[] memory _nftInfo,
        uint256 totalPrice,
        ValidateInfo memory _validateInfo
    ) public payable onlyRelayer {
        require(
            IEbookCore(coreAddress).isRelayer(_validateInfo.relayer),
            "EbookMarket: _relayer is not relayer"
        );

        _validateSignature(
            buyer,
            totalPrice,
            _validateInfo.relayer,
            _validateInfo.userSignature,
            _validateInfo.relayerSignature
        );

        uint256 _totalPrice = 0;

        for (uint256 i = 0; i < _nftInfo.length; i++) {
            BuyNFTInfo memory nftInfo = _nftInfo[i];
            _buyNFT(buyer, nftInfo);
            _totalPrice += nftInfo.price;
        }

        require(
            _totalPrice == totalPrice,
            "EbookMarket: totalPrice is not valid"
        );
    }

    function _buyNFT(address _buyer, BuyNFTInfo memory _nftInfo) internal {
        require(
            _nftInfo.collectionAddress != address(0),
            "EbookMarket: _collectionAddress is zero address"
        );

        IEbookNFTCollection collection = IEbookNFTCollection(
            _nftInfo.collectionAddress
        );

        if (_nftInfo.orderType == OrderType.LazyMint) {
            require(
                !collection.exists(_nftInfo.tokenId),
                "EbookMarket: token already minted"
            );
        } else {
            require(
                collection.ownerOf(_nftInfo.tokenId) == _nftInfo.seller,
                "EbookMarket: token not owned by seller"
            );
        }

        if (_nftInfo.orderType == OrderType.LazyMint) {
            collection.mint(
                _nftInfo.creator,
                _buyer,
                _nftInfo.tokenId,
                _nftInfo.royalty
            );
        } else {
            collection.transfer(_buyer, _nftInfo.tokenId);
        }

        uint256 tokenRoyalty = collection.getRoyalty(_nftInfo.tokenId);
        require(
            tokenRoyalty == _nftInfo.royalty,
            "EbookMarket: token royalty is not valid"
        );

        _distributionRoyalty(
            _nftInfo.collectionAddress,
            _nftInfo.tokenId,
            _nftInfo.price,
            tokenRoyalty
        );

        orders.push(
            Order({
                collectionAddress: _nftInfo.collectionAddress,
                creator: _nftInfo.creator,
                seller: _nftInfo.seller,
                buyer: _buyer,
                tokenId: _nftInfo.tokenId,
                price: _nftInfo.price,
                royalty: _nftInfo.royalty
            })
        );

        emit OrderCreated(
            _nftInfo.collectionAddress,
            _nftInfo.creator,
            _nftInfo.seller,
            _buyer,
            _nftInfo.tokenId,
            _nftInfo.price,
            _nftInfo.royalty
        );
    }

    function _distributionRoyalty(
        address _collectionAddress,
        uint256 _tokenId,
        uint256 _price,
        uint256 _tokenRoyalty
    ) internal {
        address _creator = IEbookNFTCollection(_collectionAddress).getCreator(
            _tokenId
        );

        uint256 creatorRoyaltyAmount = (_price * _tokenRoyalty) / 100;
        uint256 platformRoyaltyAmount = (_price * platformRoyaltyRatio) / 100;

        creatorRoyalty[_creator] += creatorRoyaltyAmount;
        platformRoyalty += platformRoyaltyAmount;
    }

    function _validateSignature(
        address _buyer,
        uint256 _price,
        address _relayer,
        bytes memory _userSignature,
        bytes memory _relayerSignature
    ) internal pure {
        bytes32 messageHash = keccak256(abi.encodePacked(_buyer, _price));

        bytes32 buyHash = keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", messageHash)
        );

        require(
            ECDSAUpgradeable.recover(buyHash, _userSignature) == _buyer,
            "EbookMarket: user signature is not valid"
        );

        require(
            ECDSAUpgradeable.recover(buyHash, _relayerSignature) == _relayer,
            "EbookMarket: relayer signature is not valid"
        );
    }

    function getLogs() public view returns (Order[] memory) {
        return orders;
    }

    function setPlatformRoyaltyRatio(
        uint256 _platformRoyaltyRatio
    ) public onlyRelayer {
        platformRoyaltyRatio = _platformRoyaltyRatio;
    }

    uint256[46] private __gap;
}
