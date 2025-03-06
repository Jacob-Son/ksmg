// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

import "./interface/IEbookCore.sol";

contract EbookCore is IEbookCore, Initializable, AccessControlUpgradeable {
    bytes32 public constant RELAYER_ROLE = keccak256("RELAYER_ROLE");

    address private admin; // 현재 관리자 저장

    event RelayerAdded(address indexed account);
    event RelayerRemoved(address indexed account);
    event AdminChanged(address indexed oldAdmin, address indexed newAdmin);

    function initialize() public initializer {
        admin = msg.sender; // 초기 관리자로 설정
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    modifier onlyAdmin() {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            "EbookCore: only admin"
        );
        _;
    }

    modifier onlyRelayer() {
        require(hasRole(RELAYER_ROLE, msg.sender), "EbookCore: only relayer");
        _;
    }

    function addRelayer(address account) public onlyAdmin {
        grantRole(RELAYER_ROLE, account);
        emit RelayerAdded(account);
    }

    function removeRelayer(address account) public onlyAdmin {
        revokeRole(RELAYER_ROLE, account);
        emit RelayerRemoved(account);
    }

    function isRelayer(address account) public view returns (bool) {
        return hasRole(RELAYER_ROLE, account);
    }

    function isAdmin(address account) public view returns (bool) {
        return hasRole(DEFAULT_ADMIN_ROLE, account);
    }

    function getAdmin() public view returns (address) {
        return admin;
    }

    function changeAdmin(address newAdmin) public onlyAdmin {
        require(newAdmin != address(0), "EbookCore: new admin is zero address");
        address oldAdmin = admin;
        admin = newAdmin;

        _setupRole(DEFAULT_ADMIN_ROLE, newAdmin);
        revokeRole(DEFAULT_ADMIN_ROLE, oldAdmin);

        emit AdminChanged(oldAdmin, newAdmin);
    }

    uint256[49] private __gap;
}