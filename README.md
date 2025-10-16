# proofly

A complete full-stack blockchain application for issuing tamper-proof educational certificates as NFTs using Ethereum smart contracts. The system runs entirely offline on a local blockchain with zero gas costs.

## Overview

This project replaces traditional paper certificates with blockchain-based NFTs (ERC-721 standard), providing:

- **Universities** can mint certificates as NFTs to student wallets
- **Students** truly own their certificates in their wallet forever
- **Employers** can verify certificate authenticity directly on-chain
- **No Forgery** - certificates are immutable and tamper-proof

## Features

### Core Features
- **ERC-721 Smart Contract** (OpenZeppelin implementation)
- **Local Hardhat blockchain** (cost-free development)
- **PDF Upload & Storage** - Upload actual certificate documents
- **Admin dashboard** for minting certificates
- **Student dashboard** for viewing owned certificates
- **Verifier dashboard** for authenticity checks
- **MetaMask wallet integration**
- **Certificate revocation system**
- **Modern React UI** with TailwindCSS

### Technical Features
- **TypeScript** for type safety
- **Responsive design** (mobile + desktop)
- **Real-time transaction feedback**
- **Error handling** and loading states
- **Hot module reload** for development
- **Production-ready build**

## Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MetaMask browser extension

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Start Local Blockchain
**Terminal 1** - Keep this running:
```bash
npm run blockchain
```
This starts a local Ethereum node with 20 test accounts (10,000 ETH each).

### 3. Deploy Smart Contract
**Terminal 2**:
```bash
npm run deploy
```
This deploys the CertificateNFT contract and saves the configuration.

### 4. Configure MetaMask
Add the local network to MetaMask:
- **Network Name**: Localhost 31337
- **RPC URL**: `http://127.0.0.1:8545`
- **Chain ID**: `31337`
- **Currency Symbol**: ETH

Import a test account using a private key from the Hardhat terminal.

### 5. Start Frontend
**Terminal 3**:
```bash
npm run dev
```
Visit `http://localhost:5173`

## Application Usage

### Admin Portal (`/admin`)
1. Connect your admin wallet (Account #0 - the deployer)
2. Fill in student details:
   - Student wallet address
   - Student name
   - Course name
   - Grade
   - University name
   - Issue date
   - **Certificate PDF** (optional)
3. Click "Mint Certificate"
4. Confirm transaction in MetaMask
5. Save the downloaded files to `public/metadata/` and `public/certificates/`

### Student Portal (`/student`)
1. Switch to student account in MetaMask
2. Connect wallet
3. View all certificates owned by your address
4. **View/Download PDF certificates**
5. See complete certificate details and metadata

### Verifier Portal (`/verifier`)
1. Enter any wallet address
2. Click "Verify Certificates"
3. View all blockchain-verified certificates for that address
4. **View/Download certificate PDFs**

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                      │
│  ┌─────────┐  ┌──────────┐  ┌──────────┐               │
│  │  Admin  │  │ Student  │  │ Verifier │               │
│  │  Portal │  │  Portal  │  │  Portal  │               │
│  └────┬────┘  └────┬─────┘  └────┬─────┘               │
└───────┼───────────┼──────────────┼──────────────────────┘
        │           │              │
        └───────────┴──────────────┘
                    │
        ┌───────────▼──────────────┐
        │   MetaMask (Web3 Wallet) │
        └───────────┬──────────────┘
                    │
        ┌───────────▼──────────────┐
        │  Hardhat Local Blockchain │
        │    (Ethereum Network)     │
        └───────────┬──────────────┘
                    │
        ┌───────────▼──────────────┐
        │  CertificateNFT Contract │
        │      (ERC-721)           │
        └──────────────────────────┘
```

## Project Structure

```
├── contracts/
│   └── CertificateNFT.sol          # ERC-721 smart contract
├── scripts/
│   ├── deploy.js                   # Contract deployment
│   ├── mint.js                     # Example minting script
│   └── setup.sh                    # Quick setup script
├── src/
│   ├── components/
│   │   ├── WalletConnect.tsx       # Wallet connection UI
│   │   └── CertificateCard.tsx     # Certificate display
│   ├── pages/
│   │   ├── HomePage.tsx            # Landing page
│   │   ├── AdminPage.tsx           # Admin dashboard
│   │   ├── StudentPage.tsx         # Student dashboard
│   │   └── VerifierPage.tsx        # Verifier dashboard
│   ├── lib/
│   │   └── blockchain.ts           # Web3 utilities
│   ├── types/
│   │   └── index.ts                # TypeScript types
│   └── config/
│       ├── contract.json           # Contract address
│       └── abi.json                # Contract ABI
├── public/
│   ├── metadata/                   # Certificate metadata
│   └── certificates/               # Certificate PDF files
├── hardhat.config.js               # Hardhat configuration
└── README.md
```

## Smart Contract

The `CertificateNFT` contract extends OpenZeppelin's ERC-721 implementation:

### Key Functions
- `mintCertificate(address student, string memory uri)` - Mint new certificate
- `getCertificatesByOwner(address owner)` - Get all certificates for address
- `revokeCertificate(uint256 tokenId)` - Revoke certificate (admin only)
- `isRevoked(uint256 tokenId)` - Check revocation status
- `tokenURI(uint256 tokenId)` - Get metadata URI

### Events
- `CertificateMinted(address indexed student, uint256 indexed tokenId, string tokenURI)`
- `CertificateRevoked(uint256 indexed tokenId)`

## Technology Stack

### Blockchain
- **Hardhat** - Local Ethereum development environment
- **Solidity 0.8.20** - Smart contract language
- **OpenZeppelin** - Secure ERC-721 implementation
- **Ethers.js v6** - Ethereum library

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **React Router v6** - Navigation
- **Lucide React** - Icons

## Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run blockchain   # Start local blockchain
npm run deploy       # Deploy smart contract
npm run compile      # Compile contracts
npm run lint         # Lint code
npm run typecheck    # Type checking
```

## Metadata Format

Certificate metadata is stored as JSON:

```json
{
  "name": "Certificate of Completion",
  "description": "Awarded to Alice for completing Blockchain 101",
  "studentName": "Alice Johnson",
  "course": "Blockchain 101",
  "grade": "A",
  "issueDate": "2025-10-12",
  "university": "MIT",
  "pdfPath": "http://localhost:5173/certificates/1234567890.pdf"
}
```

## Security Considerations

**Warning: This is a development setup**

- Never use test private keys in production
- Implement proper access control for production
- Use secure key management solutions
- Store metadata on IPFS for production
- Conduct security audits before mainnet deployment

## Production Deployment

For production deployment:

1. Update `hardhat.config.js` with mainnet/testnet RPC
2. Use proper wallet management (hardware wallet recommended)
3. Deploy to testnet first (Sepolia, Goerli)
4. Store metadata on IPFS
5. Implement proper access controls
6. Add comprehensive testing
7. Conduct security audit

## Use Cases

### Educational Institutions
- Universities issuing degrees
- Online courses issuing certificates
- Training programs issuing certifications
- Professional development programs

### Verification Scenarios
- Job applications
- Professional licensing
- Academic transfers
- Background checks

## Troubleshooting

### MetaMask Issues
**"Invalid Nonce" Error**
- Reset account: Settings → Advanced → Clear activity tab data

**Wrong Network**
- Ensure Chain ID is 31337
- Switch to "Localhost 31337" network

### Contract Issues
**Contract Not Found**
- Verify Hardhat node is running
- Redeploy: `npm run deploy`

**Transaction Failed**
- Check you're using the correct account
- Ensure sufficient test ETH

### PDF Issues
**PDF Not Loading**
- Place PDF files in `public/certificates/`
- Ensure pdfPath matches file location
- Check file permissions

## Future Enhancements

- [ ] Certificate expiry dates
- [ ] Batch minting functionality
- [ ] Email notifications
- [ ] IPFS metadata storage
- [ ] Multi-signature admin
- [ ] W3C Verifiable Credentials format
- [ ] Comprehensive test suite
- [ ] Gas optimization
- [ ] Mobile wallet support

## Project Stats

- **76 lines** of Solidity
- **831+ lines** of React/TypeScript
- **4 page components**
- **2 utility components**
- **Comprehensive documentation**
- **Complete blockchain application**

## Contributing

Contributions welcome! Please open an issue or submit a pull request.

## License

MIT

---

**Built with blockchain technology for a more trustworthy future in digital credentials.**
