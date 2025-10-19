// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import { OwrentTypes } from "../libraries/OwrentTypes.sol";

/**
 * @title IOwrentAccessControl
 * @notice Interface for ACL permission management contract
 * @dev Defines all public functions and events for access control
 */
interface IOwrentAccessControl {
    // ============================================
    // EVENTS
    // ============================================

    /**
     * @notice Emitted when permission is granted
     * @param attestationId Attestation identifier
     * @param grantee Address granted permission
     * @param permissionType Type of permission granted
     */
    event PermissionGranted(
        uint256 indexed attestationId,
        address indexed grantee,
        string permissionType
    );

    /**
     * @notice Emitted when permission is revoked
     * @param attestationId Attestation identifier
     * @param grantee Address whose permission was revoked
     */
    event PermissionRevoked(
        uint256 indexed attestationId,
        address indexed grantee
    );

    /**
     * @notice Emitted when batch permissions are granted
     * @param attestationId Attestation identifier
     * @param grantees Array of addresses granted permission
     * @param count Number of permissions granted
     */
    event BatchPermissionsGranted(
        uint256 indexed attestationId,
        address[] grantees,
        uint256 count
    );

    // ============================================
    // CORE FUNCTIONS
    // ============================================

    /**
     * @notice Grant decryption permission to an address
     * @param attestationId Attestation identifier
     * @param grantee Address to grant permission to
     * @param canDecryptAmount Permission to decrypt attestation amount
     * @param canDecryptRepayment Permission to decrypt repayment amount
     * @param canDecryptSEPA Permission to decrypt SEPA details
     * @param expiresAt Expiration timestamp (0 for no expiration)
     */
    function grantPermission(
        uint256 attestationId,
        address grantee,
        bool canDecryptAmount,
        bool canDecryptRepayment,
        bool canDecryptSEPA,
        uint256 expiresAt
    ) external;

    /**
     * @notice Revoke permission from an address
     * @param attestationId Attestation identifier
     * @param grantee Address to revoke permission from
     */
    function revokePermission(
        uint256 attestationId,
        address grantee
    ) external;

    /**
     * @notice Grant permissions to multiple addresses
     * @param attestationId Attestation identifier
     * @param grantees Array of addresses to grant permission to
     * @param canDecryptAmount Permission to decrypt attestation amount
     * @param canDecryptRepayment Permission to decrypt repayment amount
     * @param canDecryptSEPA Permission to decrypt SEPA details
     */
    function batchGrantPermissions(
        uint256 attestationId,
        address[] calldata grantees,
        bool canDecryptAmount,
        bool canDecryptRepayment,
        bool canDecryptSEPA
    ) external;

    /**
     * @notice Update permission expiration
     * @param attestationId Attestation identifier
     * @param grantee Address whose permission to update
     * @param newExpiresAt New expiration timestamp
     */
    function updatePermissionExpiration(
        uint256 attestationId,
        address grantee,
        uint256 newExpiresAt
    ) external;

    // ============================================
    // QUERY FUNCTIONS
    // ============================================

    /**
     * @notice Check if address has permission
     * @param attestationId Attestation identifier
     * @param grantee Address to check
     * @param permissionType Type of permission to check ("amount", "repayment", "sepa")
     * @return hasPermission True if address has valid permission
     */
    function hasPermission(
        uint256 attestationId,
        address grantee,
        string memory permissionType
    ) external view returns (bool hasPermission);

    /**
     * @notice Get permission details for an address
     * @param attestationId Attestation identifier
     * @param grantee Address to get permission for
     * @return permission The permission struct
     */
    function getPermission(
        uint256 attestationId,
        address grantee
    ) external view returns (OwrentTypes.Permission memory permission);

    /**
     * @notice Check if permission has expired
     * @param attestationId Attestation identifier
     * @param grantee Address to check
     * @return isExpired True if permission has expired
     */
    function isPermissionExpired(
        uint256 attestationId,
        address grantee
    ) external view returns (bool isExpired);

    /**
     * @notice Get all addresses with permissions for an attestation
     * @param attestationId Attestation identifier
     * @return grantees Array of addresses with permissions
     */
    function getPermissionGrantees(
        uint256 attestationId
    ) external view returns (address[] memory grantees);

    /**
     * @notice Check if address can decrypt amount
     * @param attestationId Attestation identifier
     * @param grantee Address to check
     * @return canDecrypt True if address can decrypt amount
     */
    function canDecryptAmount(
        uint256 attestationId,
        address grantee
    ) external view returns (bool canDecrypt);

    /**
     * @notice Check if address can decrypt repayment amount
     * @param attestationId Attestation identifier
     * @param grantee Address to check
     * @return canDecrypt True if address can decrypt repayment amount
     */
    function canDecryptRepayment(
        uint256 attestationId,
        address grantee
    ) external view returns (bool canDecrypt);

    /**
     * @notice Check if address can decrypt SEPA details
     * @param attestationId Attestation identifier
     * @param grantee Address to check
     * @return canDecrypt True if address can decrypt SEPA details
     */
    function canDecryptSEPA(
        uint256 attestationId,
        address grantee
    ) external view returns (bool canDecrypt);
}
