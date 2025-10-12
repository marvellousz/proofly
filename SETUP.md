# NFT-Based Certificate Issuer - Setup Guide

A full-stack blockchain application for issuing, managing, and verifying educational certificates as NFTs on a local Ethereum blockchain.

## Prerequisites

- Node.js (v18 or higher)
- MetaMask browser extension
- Terminal/Command prompt

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Local Blockchain

Open a new terminal window and run:

```bash
npx hardhat node
```

This will:
- Start a local Ethereum node on `http://127.0.0.1:8545`
- Display 20 test accounts with private keys
- Each account has 10,000 test ETH

**Keep this terminal running throughout development.**

### 3. Deploy Smart Contract

In a new terminal window:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

This will:
- Deploy the CertificateNFT contract to the local blockchain
- Save the contract address to `src/config/contract.json`
- Save the contract ABI to `src/config/abi.json`

### 4. Configure MetaMask

1. Open MetaMask extension
2. Click on the network dropdown (top center)
3. Click "Add Network" → "Add a network manually"
4. Enter these details:
   - **Network Name**: Localhost 8545
   - **RPC URL**: `http://127.0.0.1:8545`
   - **Chain ID**: `1337`
   - **Currency Symbol**: ETH
5. Click "Save"

### 5. Import Test Account

1. In MetaMask, click the account icon (top right)
2. Select "Import Account"
3. Paste one of the private keys from the Hardhat node terminal
4. Click "Import"

**Note**: Use Account #0 for admin functions (the deployer account).

### 6. Start Frontend

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Application Structure

### Three Main Portals

1. **Admin Portal** (`/admin`)
   - Connect admin wallet (the deployer account)
   - Issue new certificates by entering student details
   - Mint NFTs to student wallet addresses

2. **Student Portal** (`/student`)
   - Connect student wallet
   - View all owned certificates
   - See certificate details and metadata

3. **Verifier Portal** (`/verifier`)
   - No wallet connection required
   - Enter any wallet address to verify certificates
   - View blockchain-verified certificate details

## Usage Workflow

### Issue a Certificate (Admin)

1. Go to `/admin`
2. Connect your admin wallet (Account #0)
3. Fill in the certificate form:
   - Student Wallet Address (use another account from Hardhat)
   - Student Name
   - Course Name
   - Grade
   - Issue Date
4. Click "Mint Certificate"
5. Confirm the transaction in MetaMask
6. A metadata JSON file will download - place it in `public/metadata/` directory

### View Certificates (Student)

1. Switch to the student account in MetaMask
2. Go to `/student`
3. Connect your wallet
4. View all certificates owned by your address

### Verify Certificates (Employer)

1. Go to `/verifier`
2. Enter the student's wallet address
3. Click "Verify Certificates"
4. View all certificates owned by that address

## Smart Contract Features

The `CertificateNFT` contract (ERC-721) includes:

- `mintCertificate(address student, string memory uri)` - Mint new certificate
- `getCertificatesByOwner(address owner)` - Get all certificates for an address
- `revokeCertificate(uint256 tokenId)` - Revoke a certificate (admin only)
- `isRevoked(uint256 tokenId)` - Check if certificate is revoked
- `tokenURI(uint256 tokenId)` - Get metadata URI for a certificate

## Project Structure

```
project/
├── contracts/
│   └── CertificateNFT.sol        # ERC-721 smart contract
├── scripts/
│   ├── deploy.js                 # Deployment script
│   └── mint.js                   # Example minting script
├── src/
│   ├── components/
│   │   ├── WalletConnect.tsx     # Wallet connection component
│   │   └── CertificateCard.tsx   # Certificate display component
│   ├── pages/
│   │   ├── HomePage.tsx          # Landing page
│   │   ├── AdminPage.tsx         # Admin dashboard
│   │   ├── StudentPage.tsx       # Student dashboard
│   │   └── VerifierPage.tsx      # Verifier dashboard
│   ├── lib/
│   │   └── blockchain.ts         # Web3 utility functions
│   ├── types/
│   │   └── index.ts              # TypeScript interfaces
│   └── config/
│       ├── contract.json         # Contract address (generated)
│       └── abi.json              # Contract ABI (generated)
├── public/
│   └── metadata/                 # Certificate metadata JSON files
└── hardhat.config.js             # Hardhat configuration
```

## Troubleshooting

### MetaMask shows "Invalid Nonce" error
- Reset your account: Settings → Advanced → Clear activity tab data

### Contract not found error
- Make sure Hardhat node is running
- Redeploy the contract: `npx hardhat run scripts/deploy.js --network localhost`

### Metadata not loading
- Ensure JSON files are in `public/metadata/` directory
- Check that the tokenURI matches the file location

### Wrong network
- Make sure MetaMask is connected to "Localhost 8545"
- Chain ID should be 1337

## Development Tips

1. **Reset Blockchain**: Stop Hardhat node (Ctrl+C) and restart it to reset the blockchain state

2. **Multiple Accounts**: Import multiple accounts from Hardhat for testing different roles

3. **View Transactions**: Check the Hardhat terminal to see all transactions in real-time

4. **Test Metadata**: Sample metadata is provided in `public/metadata/0.json`

5. **Production Deployment**: For mainnet/testnet deployment, update `hardhat.config.js` and use IPFS for metadata storage

## Technologies Used

- **Blockchain**: Hardhat (local Ethereum network)
- **Smart Contract**: Solidity 0.8.20, OpenZeppelin ERC-721
- **Frontend**: React, TypeScript, TailwindCSS
- **Web3**: Ethers.js v6
- **Routing**: React Router v6
- **Icons**: Lucide React

## Security Notes

- This is a development setup - never use test private keys in production
- For production, implement proper access control and use secure key management
- Store metadata on decentralized storage (IPFS) for production use
- Enable RLS if using Supabase for additional features

## Next Steps

- Add certificate expiry dates
- Implement batch minting
- Add PDF export functionality
- Create automated tests
- Deploy to testnet (Sepolia/Goerli)
- Integrate IPFS for metadata storage
