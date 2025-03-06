// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

interface IEbookCollectionFactory {
    function getBaseURI() external view returns (string memory);
}
