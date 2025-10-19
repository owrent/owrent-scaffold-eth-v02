// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

import { euint64, ebool, eaddress } from "@fhevm/solidity/lib/FHE.sol";

/**
 * @title OwrentTypes
 * @notice Common data structures and types used across Owrent contracts
 * @dev This library defines all enums, structs, and custom errors for the Owrent platform
 */
library OwrentTypes {
    // ============================================
    // ENUMS
    // ============================================

    /**
     * @notice Type of financing attestation
     * @dev FACTORING: Selling invoices at a discount for immediate cash
     * @dev LOAN: Short-term borrowing against an invoice (≤30 days)
     */
    enum AttestationType {
        FACTORING,
        LOAN
    }

    /**
     * @notice Current status of an attestation
     * @dev PENDING: Created but not yet active
     * @dev ACTIVE: Currently active and operational
     * @dev COMPLETED: Successfully completed
     * @dev CANCELLED: Cancelled by owner
     */
    enum AttestationStatus {
        PENDING,
        ACTIVE,
        COMPLETED,
        CANCELLED
    }

    // ============================================
    // STRUCTS
    // ============================================

    /**
     * @notice Main attestation structure with encrypted amounts
     * @dev All sensitive financial data is encrypted using FHEVM euint64
     * @param id Unique attestation identifier (sequential)
     * @param owner Address of the attestation creator
     * @param attestationType Type of financing (FACTORING or LOAN)
     * @param status Current attestation status
     * @param encryptedAmount Encrypted invoice/loan amount (euint64)
     * @param encryptedRepaymentAmount Encrypted total repayment amount (euint64)
     * @param documentHash Hash of supporting document (invoice, contract, etc.)
     * @param createdAt Timestamp when attestation was created
     * @param dueDate Repayment due date (Unix timestamp)
     * @param platformFee Platform fee in basis points (e.g., 50 = 0.5%)
     * @param settlementFee Settlement fee in basis points (e.g., 10 = 0.1%)
     */
    struct Attestation {
        uint256 id;
        address owner;
        AttestationType attestationType;
        AttestationStatus status;
        euint64 encryptedAmount;
        euint64 encryptedRepaymentAmount;
        bytes32 documentHash;
        uint256 createdAt;
        uint256 dueDate;
        uint256 platformFee;
        uint256 settlementFee;
    }

    /**
     * @notice SEPA authorization structure with encrypted bank details
     * @dev Bank account information is encrypted for privacy
     * @param attestationId Linked attestation ID
     * @param encryptedIBAN Encrypted IBAN (International Bank Account Number)
     * @param encryptedAccountHolder Encrypted account holder name
     * @param mandateReference Plaintext mandate reference for identification
     * @param repaymentDate Scheduled repayment date (Unix timestamp)
     * @param walletSignature Authorization signature from wallet
     * @param isActive Whether authorization is currently active
     * @param createdAt Timestamp when authorization was created
     */
    struct SEPAAuthorization {
        uint256 attestationId;
        bytes encryptedIBAN;
        bytes encryptedAccountHolder;
        string mandateReference;
        uint256 repaymentDate;
        bytes walletSignature;
        bool isActive;
        uint256 createdAt;
    }

    /**
     * @notice Permission structure for ACL management
     * @dev Controls who can decrypt specific encrypted data
     * @param grantee Address granted permission
     * @param canDecryptAmount Permission to decrypt attestation amount
     * @param canDecryptRepayment Permission to decrypt repayment amount
     * @param canDecryptSEPA Permission to decrypt SEPA details
     * @param grantedAt Timestamp when permission was granted
     * @param expiresAt Expiration timestamp (0 for no expiration)
     */
    struct Permission {
        address grantee;
        bool canDecryptAmount;
        bool canDecryptRepayment;
        bool canDecryptSEPA;
        uint256 grantedAt;
        uint256 expiresAt;
    }

    /**
     * @notice Decryption request tracking structure
     * @dev Tracks pending decryption requests to oracle
     * @param attestationId Associated attestation ID
     * @param requester Address that requested decryption
     * @param requestedAt Timestamp of request
     * @param isCompleted Whether decryption callback was received
     */
    struct DecryptionRequest {
        uint256 attestationId;
        address requester;
        uint256 requestedAt;
        bool isCompleted;
    }

    /**
     * @notice Fee calculation result structure
     * @dev Contains all calculated fees for an attestation
     * @param platformFee Platform fee amount (0.5% of amount)
     * @param settlementFee Settlement fee amount (0.1% for factoring)
     * @param interestFee Interest fee for loans (based on duration)
     * @param totalFees Sum of all fees
     * @param netAmount Amount minus total fees
     */
    struct FeeCalculation {
        uint256 platformFee;
        uint256 settlementFee;
        uint256 interestFee;
        uint256 totalFees;
        uint256 netAmount;
    }

    // ============================================
    // CUSTOM ERRORS
    // ============================================

    /**
     * @notice Attestation not found
     * @param attestationId The ID that was not found
     */
    error AttestationNotFound(uint256 attestationId);

    /**
     * @notice Caller is not authorized for this operation
     * @param caller Address of the unauthorized caller
     */
    error Unauthorized(address caller);

    /**
     * @notice Invalid status transition attempted
     * @param currentStatus Current attestation status
     * @param requestedStatus Requested new status
     */
    error InvalidStatus(AttestationStatus currentStatus, AttestationStatus requestedStatus);

    /**
     * @notice Invalid amount provided
     */
    error InvalidAmount();

    /**
     * @notice Invalid due date provided
     * @param provided The provided due date
     * @param minimum The minimum acceptable due date
     */
    error InvalidDueDate(uint256 provided, uint256 minimum);

    /**
     * @notice Permission has expired
     * @param expiresAt The expiration timestamp
     */
    error PermissionExpired(uint256 expiresAt);

    /**
     * @notice SEPA authorization not found or inactive
     * @param attestationId The attestation ID
     */
    error SEPANotAuthorized(uint256 attestationId);

    /**
     * @notice Invalid signature provided
     */
    error InvalidSignature();

    /**
     * @notice HCU (Homomorphic Complexity Unit) limit exceeded
     * @param used HCU used
     * @param limit HCU limit
     */
    error HCULimitExceeded(uint256 used, uint256 limit);

    /**
     * @notice Invalid document hash
     */
    error InvalidDocumentHash();

    /**
     * @notice Invalid address provided
     */
    error InvalidAddress();

    /**
     * @notice Attestation already exists
     * @param attestationId The existing attestation ID
     */
    error AttestationAlreadyExists(uint256 attestationId);

    /**
     * @notice Permission already granted
     * @param grantee The address that already has permission
     */
    error PermissionAlreadyGranted(address grantee);

    /**
     * @notice Permission not found
     * @param grantee The address without permission
     */
    error PermissionNotFound(address grantee);

    /**
     * @notice Decryption request not found
     * @param requestId The request ID that was not found
     */
    error DecryptionRequestNotFound(uint256 requestId);

    /**
     * @notice Decryption already completed
     * @param requestId The request ID that was already completed
     */
    error DecryptionAlreadyCompleted(uint256 requestId);

    // ============================================
    // CONSTANTS
    // ============================================

    /**
     * @notice Platform fee in basis points (0.5%)
     */
    uint256 constant PLATFORM_FEE_BPS = 50;

    /**
     * @notice Settlement fee in basis points (0.1%)
     */
    uint256 constant SETTLEMENT_FEE_BPS = 10;

    /**
     * @notice Basis points denominator (100% = 10000 bps)
     */
    uint256 constant BPS_DENOMINATOR = 10000;

    /**
     * @notice Maximum loan duration in seconds (30 days)
     */
    uint256 constant MAX_LOAN_DURATION = 30 days;

    /**
     * @notice Minimum bid window in seconds (1 hour)
     */
    uint256 constant MIN_BID_WINDOW = 1 hours;

    /**
     * @notice Maximum bid window in seconds (7 days)
     */
    uint256 constant MAX_BID_WINDOW = 7 days;

    /**
     * @notice Sequential HCU limit per transaction
     */
    uint256 constant SEQUENTIAL_HCU_LIMIT = 5_000_000;

    /**
     * @notice Global HCU limit per transaction
     */
    uint256 constant GLOBAL_HCU_LIMIT = 20_000_000;

    // ============================================
    // HELPER FUNCTIONS
    // ============================================

    /**
     * @notice Check if a status transition is valid
     * @param from Current status
     * @param to Requested new status
     * @return bool True if transition is valid
     */
    function isValidStatusTransition(
        AttestationStatus from,
        AttestationStatus to
    ) internal pure returns (bool) {
        // PENDING can transition to ACTIVE or CANCELLED
        if (from == AttestationStatus.PENDING) {
            return to == AttestationStatus.ACTIVE || to == AttestationStatus.CANCELLED;
        }
        
        // ACTIVE can transition to COMPLETED or CANCELLED
        if (from == AttestationStatus.ACTIVE) {
            return to == AttestationStatus.COMPLETED || to == AttestationStatus.CANCELLED;
        }
        
        // COMPLETED and CANCELLED are terminal states
        return false;
    }

    /**
     * @notice Calculate platform fee
     * @param amount The base amount
     * @return uint256 The calculated platform fee
     */
    function calculatePlatformFee(uint256 amount) internal pure returns (uint256) {
        return (amount * PLATFORM_FEE_BPS) / BPS_DENOMINATOR;
    }

    /**
     * @notice Calculate settlement fee
     * @param amount The base amount
     * @return uint256 The calculated settlement fee
     */
    function calculateSettlementFee(uint256 amount) internal pure returns (uint256) {
        return (amount * SETTLEMENT_FEE_BPS) / BPS_DENOMINATOR;
    }

    /**
     * @notice Calculate interest fee for loans
     * @param amount The loan amount
     * @param durationDays The loan duration in days
     * @return uint256 The calculated interest fee
     * @dev Simple interest calculation: amount * days * 0.1% per day
     */
    function calculateInterestFee(
        uint256 amount,
        uint256 durationDays
    ) internal pure returns (uint256) {
        // 0.1% per day = 10 basis points per day
        uint256 dailyRateBps = 10;
        return (amount * durationDays * dailyRateBps) / BPS_DENOMINATOR;
    }

    /**
     * @notice Check if permission has expired
     * @param expiresAt Expiration timestamp (0 for no expiration)
     * @return bool True if permission has expired
     */
    function isPermissionExpired(uint256 expiresAt) internal view returns (bool) {
        if (expiresAt == 0) {
            return false; // No expiration
        }
        return block.timestamp >= expiresAt;
    }

    /**
     * @notice Validate due date is in the future
     * @param dueDate The due date to validate
     * @return bool True if due date is valid
     */
    function isValidDueDate(uint256 dueDate) internal view returns (bool) {
        return dueDate > block.timestamp;
    }

    /**
     * @notice Validate document hash is not zero
     * @param documentHash The document hash to validate
     * @return bool True if document hash is valid
     */
    function isValidDocumentHash(bytes32 documentHash) internal pure returns (bool) {
        return documentHash != bytes32(0);
    }

    /**
     * @notice Validate address is not zero
     * @param addr The address to validate
     * @return bool True if address is valid
     */
    function isValidAddress(address addr) internal pure returns (bool) {
        return addr != address(0);
    }
}
