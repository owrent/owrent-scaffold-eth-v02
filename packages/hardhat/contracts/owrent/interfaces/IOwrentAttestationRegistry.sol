// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import { euint64, externalEuint64 } from "@fhevm/solidity/lib/FHE.sol";
import { OwrentTypes } from "../libraries/OwrentTypes.sol";

/**
 * @title IOwrentAttestationRegistry
 * @notice Interface for the main Owrent attestation registry contract
 * @dev Defines all public functions and events for attestation management
 */
interface IOwrentAttestationRegistry {
    // ============================================
    // EVENTS
    // ============================================

    /**
     * @notice Emitted when a new attestation is created
     * @param attestationId Unique attestation identifier
     * @param owner Address of the attestation creator
     * @param attestationType Type of financing (FACTORING or LOAN)
     * @param documentHash Hash of supporting document
     */
    event AttestationCreated(
        uint256 indexed attestationId,
        address indexed owner,
        OwrentTypes.AttestationType attestationType,
        bytes32 documentHash
    );

    /**
     * @notice Emitted when attestation status is updated
     * @param attestationId Attestation identifier
     * @param oldStatus Previous status
     * @param newStatus New status
     */
    event StatusUpdated(
        uint256 indexed attestationId,
        OwrentTypes.AttestationStatus oldStatus,
        OwrentTypes.AttestationStatus newStatus
    );

    /**
     * @notice Emitted when decryption is requested
     * @param attestationId Attestation identifier
     * @param requestId Decryption request identifier
     * @param requester Address requesting decryption
     */
    event DecryptionRequested(
        uint256 indexed attestationId,
        uint256 requestId,
        address indexed requester
    );

    /**
     * @notice Emitted when amounts are decrypted
     * @param attestationId Attestation identifier
     * @param amount Decrypted amount
     * @param repaymentAmount Decrypted repayment amount
     */
    event AmountsDecrypted(
        uint256 indexed attestationId,
        uint64 amount,
        uint64 repaymentAmount
    );

    /**
     * @notice Emitted when fees are calculated
     * @param attestationId Attestation identifier
     * @param platformFee Platform fee amount
     * @param settlementFee Settlement fee amount
     * @param interestFee Interest fee amount (for loans)
     */
    event FeesCalculated(
        uint256 indexed attestationId,
        uint256 platformFee,
        uint256 settlementFee,
        uint256 interestFee
    );

    // ============================================
    // CORE FUNCTIONS
    // ============================================

    /**
     * @notice Create a new attestation with encrypted amounts
     * @param attestationType Type of financing (FACTORING or LOAN)
     * @param encryptedAmount Encrypted invoice/loan amount
     * @param encryptedRepaymentAmount Encrypted total repayment amount
     * @param inputProof Proof for encrypted inputs
     * @param documentHash Hash of supporting document
     * @param dueDate Repayment due date (Unix timestamp)
     * @return attestationId The unique identifier for the created attestation
     */
    function createAttestation(
        OwrentTypes.AttestationType attestationType,
        externalEuint64 encryptedAmount,
        externalEuint64 encryptedRepaymentAmount,
        bytes calldata inputProof,
        bytes32 documentHash,
        uint256 dueDate
    ) external returns (uint256 attestationId);

    /**
     * @notice Update attestation status
     * @param attestationId Attestation identifier
     * @param newStatus New status to set
     */
    function updateStatus(
        uint256 attestationId,
        OwrentTypes.AttestationStatus newStatus
    ) external;

    /**
     * @notice Request decryption of attestation amounts
     * @param attestationId Attestation identifier
     * @return requestId Decryption request identifier
     */
    function requestDecryption(
        uint256 attestationId
    ) external returns (uint256 requestId);

    /**
     * @notice Callback for decryption results from oracle
     * @param requestId Decryption request identifier
     * @param cleartexts Decrypted values
     * @param decryptionProof Proof of decryption
     */
    function callbackDecryption(
        uint256 requestId,
        bytes memory cleartexts,
        bytes memory decryptionProof
    ) external;

    // ============================================
    // QUERY FUNCTIONS
    // ============================================

    /**
     * @notice Get attestation by ID
     * @param attestationId Attestation identifier
     * @return attestation The attestation struct
     */
    function getAttestation(
        uint256 attestationId
    ) external view returns (OwrentTypes.Attestation memory attestation);

    /**
     * @notice Get number of attestations for a user
     * @param user User address
     * @return count Number of attestations
     */
    function getUserAttestationCount(
        address user
    ) external view returns (uint256 count);

    /**
     * @notice Get user attestation by index
     * @param user User address
     * @param index Index in user's attestation array
     * @return attestationId The attestation identifier
     */
    function getUserAttestationByIndex(
        address user,
        uint256 index
    ) external view returns (uint256 attestationId);

    /**
     * @notice Get total number of attestations
     * @return count Total attestation count
     */
    function getTotalAttestationCount() external view returns (uint256 count);

    /**
     * @notice Get encrypted amount for an attestation
     * @param attestationId Attestation identifier
     * @return encryptedAmount The encrypted amount
     */
    function getEncryptedAmount(
        uint256 attestationId
    ) external view returns (euint64 encryptedAmount);

    /**
     * @notice Get encrypted repayment amount for an attestation
     * @param attestationId Attestation identifier
     * @return encryptedRepaymentAmount The encrypted repayment amount
     */
    function getEncryptedRepaymentAmount(
        uint256 attestationId
    ) external view returns (euint64 encryptedRepaymentAmount);
}
