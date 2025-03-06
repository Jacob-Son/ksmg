// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

interface IEbookNFTCollection {
    function initialize(
        string memory _name,
        string memory _symbol,
        address owner,
        address _coreAddress,
        address _factory
    ) external;

    function mint(
        address _creator,
        address _recipient,
        uint256 _tokenId,
        uint256 _royalty
    ) external;

    function burn(uint256 tokenId) external;

    function transfer(address to, uint256 id) external;

    function ownerOf(uint256 tokenId) external view returns (address);

    function exists(uint256 tokenId) external view returns (bool);

    function getNFTInfo(
        uint256 _tokenId
    ) external view returns (address, uint256);

    function getRoyalty(uint256 _tokenId) external view returns (uint96);

    function getCreator(uint256 _tokenId) external view returns (address);
}
