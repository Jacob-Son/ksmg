// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/ClonesUpgradeable.sol";

import "./core/EbookContract.sol";
import "./interface/IEbookNFTCollection.sol";
import "./interface/IEbookCollectionFactory.sol";

contract EbookCollectionFactory is
    Initializable,
    EbookContract,
    IEbookCollectionFactory
{
    address public collectionImplementation;
    string public baseURI;

    address[] public collections;
    mapping(uint256 => uint256) public isSaltUsed;

    event CollectionCreated(address collection, address owner);

    function initialize(
        address _coreAddress,
        string memory _baseURI
    ) public initializer {
        __EbookContract_init(_coreAddress);
        baseURI = _baseURI;
    }

    function getCollectionAddress(
        string memory name,
        string memory symbol,
        address owner,
        uint256 salt
    ) public view returns (address) {
        return
            ClonesUpgradeable.predictDeterministicAddress(
                collectionImplementation,
                keccak256(abi.encodePacked(name, symbol, owner, salt))
            );
    }

    function createCollection(
        string memory name,
        string memory symbol,
        address owner,
        uint256 salt
    ) public onlyRelayer returns (address) {
        require(
            isSaltUsed[salt] == 0,
            "EbookCollectionFactory: Salt is already used"
        );
        address collection = ClonesUpgradeable.cloneDeterministic(
            collectionImplementation,
            keccak256(abi.encodePacked(name, symbol, owner, salt))
        );
        IEbookNFTCollection(collection).initialize(
            name,
            symbol,
            owner,
            coreAddress,
            address(this)
        );
        collections.push(collection);
        isSaltUsed[salt] = 1;
        emit CollectionCreated(collection, owner);
        return collection;
    }

    function setCollectionImplementation(
        address _collectionImplementation
    ) public onlyAdmin {
        collectionImplementation = _collectionImplementation;
    }

    function getBaseURI() public view returns (string memory) {
        return baseURI;
    }

    function setBaseURI(string memory _baseURI) public onlyAdmin {
        baseURI = _baseURI;
    }

    uint256[46] private __gap;
}
