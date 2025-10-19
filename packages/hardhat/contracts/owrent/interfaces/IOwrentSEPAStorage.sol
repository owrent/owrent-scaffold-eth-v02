// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import { OwrentTypes } from "../libraries/OwrentTypes.sol";

/**
 * @title IOwrentSEPAStorage
 * @notice Interface for SEPA authorization storage contract
 * @dev Defines all public functions and events for SEPA authorization management
 */
interface IOwrentSEPAStorage {
    // ============================================
    // EVENTS
    // ============================================

    /**
     * @notice Emitted when SEPA authorization is stored
     * @param attestationId Linked attestation identifier
     * @param mandateReference SEPA mandate reference
     * @param repaymentDate Scheduled repayment date
     */
    event SEPAAuthorized(
        uint256 indexed attestationId,
        string mandateReference,
        uint256 repaymentDate
    );

    /**
     * @notice Emitted when SEPA authorization is revoked
     * @param attestationId Linked attestation identifier
     */
    event SEPARevoked(
        uint256 indexed attestationId
    );

    /**
     * @notice Emitted when SEPA decryption is requested
     * @param attestationId Linked attestation identifier
     * @param requestId Decryption request identifier
     * @param requester Address requesting decryption
     */
    event SEPADecryptionRequested(
        uint256 indexed attestationId,
        uint256 requestId,
        address indexed requester
    );

    /**
     * @notice Emitted when SEPA details are decrypted
     * @param attestationId Linked attestation identifier
     * @param iban Decrypted IBAN
     * @param accountHolder Decrypted account holder name
     */
    event SEPADecrypted(
        uint256 indexed attestationId,
        string iban,
        string accountHolder
    );

    // ============================================
    // CORE FUNCTIONS
    // ============================================

    /**
     * @notice Store encrypted SEPA authorization
     * @param attestationId Linked attestation identifier
     * @param encryptedIBAN Encrypted IBAN
     * @param encryptedAccountHolder Encrypted account holder name
     * @param mandateReference SEPA mandate reference
     * @param repaymentDate Scheduled repayment date
     * @param walletSignature Authorization signature from wallet
     */
    function storeSEPAAuthorization(
        uint256 attestationId,
        bytes calldata encryptedIBAN,
        bytes calldata encryptedAccountHolder,
        string calldata mandateReference,
        uint256 repaymentDate,
        bytes calldata walletSignature
    ) external;

    /**
     * @notice Revoke SEPA authorization
     * @param attestationId Linked attestation identifier
     */
    function revokeSEPAAuthorization(
        uint256 attestationId
    ) external;

    /**
     * @notice Request decryption of SEPA details
     * @param attestationId Linked attestation identifier
     * @return requestId Decryption request identifier
     */
    function requestSEPADecryption(
        uint256 attestationId
    ) external returns (uint256 requestId);

    /**
     * @notice Callback for SEPA decryption results from oracle
     * @param requestId Decryption request identifier
     * @param cleartexts Decrypted values
     * @param decryptionProof Proof of decryption
     */
    function callbackSEPADecryption(
        uint256 requestId,
        bytes memory cleartexts,
        bytes memory decryptionProof
    ) external;

    // ============================================
    // QUERY FUNCTIONS
    // ============================================

    /**
     * @notice Get SEPA authorization for an attestation
     * @param attestationId Linked attestation identifier
     * @return sepaAuth The SEPA authorization struct
     */
    function getSEPAAuthorization(
        uint256 attestationId
    ) external view returns (OwrentTypes.SEPAAuthorization memory sepaAuth);

    /**
     * @notice Check if SEPA authorization exists and is active
     * @param attestationId Linked attestation identifier
     * @return isActive True if authorization exists and is active
     */
    function isSEPAAuthorized(
        uint256 attestationId
    ) external view returns (bool isActive);

    /**
     * @notice Get encrypted IBAN for an attestation
     * @param attestationId Linked attestation identifier
     * @return encryptedIBAN The encrypted IBAN
     */
    function getEncryptedIBAN(
        uint256 attestationId
    ) external view returns (bytes memory encryptedIBAN);

    /**
     * @notice Get encrypted account holder for an attestation
     * @param attestationId Linked attestation identifier
     * @return encryptedAccountHolder The encrypted account holder name
     */
    function getEncryptedAccountHolder(
        uint256 attestationId
    ) external view returns (bytes memory encryptedAccountHolder);
}
