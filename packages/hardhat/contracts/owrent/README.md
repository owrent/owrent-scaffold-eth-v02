# Owrent Smart Contracts

This directory contains the Owrent smart contracts implementing confidential invoice factoring and short-term loan functionality using ZAMA FHEVM.

## Directory Structure

```
owrent/
├── core/                           # Core contract implementations
│   ├── OwrentAttestationRegistry.sol
│   ├── OwrentSEPAStorage.sol
│   └── OwrentAccessControl.sol
├── interfaces/                     # Contract interfaces
│   ├── IOwrentAttestationRegistry.sol
│   ├── IOwrentSEPAStorage.sol
│   └── IOwrentAccessControl.sol
├── libraries/                      # Reusable libraries
│   └── OwrentTypes.sol
└── README.md                       # This file
```

## Contracts Overview

### Core Contracts

1. **OwrentAttestationRegistry.sol**
   - Main contract for managing attestations
   - Handles encrypted amounts using FHEVM euint64
   - Manages attestation lifecycle (PENDING → ACTIVE → COMPLETED/CANCELLED)
   - Calculates fees (platform fee, settlement fee)
   - Integrates with decryption oracle

2. **OwrentSEPAStorage.sol**
   - Stores encrypted SEPA authorization data
   - Manages encrypted IBAN and account holder information
   - Handles signature verification for authorizations
   - Supports decryption requests for authorized parties

3. **OwrentAccessControl.sol**
   - Manages ACL permissions for encrypted data
   - Grants/revokes decryption permissions
   - Supports batch permission operations
   - Handles permission expiration

### Interfaces

All public functions are defined in interfaces for clear contract boundaries and easier integration.

### Libraries

- **OwrentTypes.sol**: Common data structures and enums used across contracts

## FHEVM Integration

All contracts inherit from `SepoliaConfig` (ZAMA configuration) and use:
- **Encrypted types**: `euint64` for amounts, `ebool` for booleans
- **FHE operations**: `FHE.add`, `FHE.sub`, `FHE.select`, etc.
- **ACL management**: `FHE.allow`, `FHE.allowThis`
- **Decryption oracle**: `FHE.requestDecryption`, callback handling

## Development

### Prerequisites

- Node.js >= 20.18.3
- Yarn v3.2.3
- Hardhat 2.22.x
- FHEVM dependencies installed

### Compile Contracts

```bash
cd owrent-scaffold-eth-v02/packages/hardhat
yarn compile
```

### Run Tests

```bash
# Mocked mode (fast)
yarn test

# Real FHEVM mode
yarn test --network sepolia
```

### Deploy Contracts

```bash
# Local network
yarn deploy

# Testnet
yarn deploy --network sepolia
```

## Security Considerations

- All contracts use `ReentrancyGuard` from OpenZeppelin
- Input validation on all public functions
- Overflow prevention using `FHE.select`
- Access control on sensitive operations
- Signature verification for SEPA authorizations

## Gas Optimization

- Use scalar operands when possible
- Minimize encrypted operations
- Batch ACL permission grants
- Stay within HCU limits (5M sequential, 20M global)

## License

MIT
