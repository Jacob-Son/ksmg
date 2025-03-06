// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

import "../interface/IEbookCore.sol";

abstract contract EbookContract is Initializable {
    address public coreAddress;

    function __EbookContract_init(
        address _coreAddress
    ) internal onlyInitializing {
        coreAddress = _coreAddress;
    }

    modifier onlyRelayer() {
        require(
            IEbookCore(coreAddress).isRelayer(msg.sender),
            "EbookNFTCollection: Only relayer can call this function"
        );
        _;
    }

    modifier onlyAdmin() {
        require(
            IEbookCore(coreAddress).isAdmin(msg.sender),
            "EbookNFTCollection: Only admin can call this function"
        );
        _;
    }

    uint256[50] private __gap;
}
