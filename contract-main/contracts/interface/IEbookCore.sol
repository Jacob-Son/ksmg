// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

interface IEbookCore {
    function addRelayer(address account) external;

    function removeRelayer(address account) external;

    function isRelayer(address account) external view returns (bool);

    function isAdmin(address account) external view returns (bool);
}
