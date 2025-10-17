# proofly

A blockchain-powered platform for issuing tamper-proof educational certificates as NFTs. No forgery, complete ownership, instant verification.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview

Proofly replaces traditional paper certificates with blockchain-based NFTs (ERC-721 standard), eliminating forgery and providing true digital ownership. The system runs on a local Ethereum blockchain with zero gas costs during development.

**Who it's for:** Educational institutions, training programs, employers verifying credentials, and students who want true ownership of their achievements.

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS
- **Blockchain**: Hardhat (Local Ethereum Node)
- **Smart Contracts**: Solidity 0.8.20, OpenZeppelin (ERC-721)
- **Web3**: Ethers.js v6, MetaMask Integration
- **Routing**: React Router v6
- **Icons**: Lucide React

## Features

- **Blockchain Certificates**: Issue certificates as tamper-proof ERC-721 NFTs
- **True Ownership**: Students truly own certificates in their wallet forever
- **Instant Verification**: Employers verify authenticity directly on-chain
- **PDF Storage**: Upload and attach actual certificate documents
- **Three-Portal System**: Separate dashboards for admins, students, and verifiers
- **Certificate Revocation**: Admin ability to revoke certificates when needed
- **Local Development**: Cost-free development on local blockchain
- **MetaMask Integration**: Secure wallet connection for all interactions

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/marvellousz/proofly.git
   cd proofly
   ```

2. **Install dependencies**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Start local blockchain** (Terminal 1)
   ```bash
   npm run blockchain
   ```
   
   This starts a local Ethereum node with 20 test accounts (10,000 ETH each). Keep this terminal running.

4. **Deploy smart contract** (Terminal 2)
   ```bash
   npm run deploy
   ```
   
   This deploys the CertificateNFT contract and saves the configuration.

5. **Configure MetaMask**
   
   Add the local network to MetaMask:
   - **Network Name**: Localhost 31337
   - **RPC URL**: `http://127.0.0.1:8545`
   - **Chain ID**: `31337`
   - **Currency Symbol**: ETH
   
   Import a test account using a private key from the Hardhat terminal output.

6. **Start the application** (Terminal 3)
   ```bash
   npm run dev
   ```

Visit `http://localhost:5173` to use the application.

## Usage

### Admin Portal (`/admin`)

1. **Connect wallet** - Use Account #0 (the deployer/admin account)
2. **Fill in certificate details**:
   - Student wallet address
   - Student name
   - Course name
   - Grade
   - University name
   - Issue date
   - Certificate PDF (optional)
3. **Click "Mint Certificate"** to create the NFT
4. **Confirm transaction** in MetaMask
5. **Save the downloaded files** to `public/metadata/` and `public/certificates/`
6. **Certificate is issued** - student now owns the NFT

### Student Portal (`/student`)

1. **Switch to student account** in MetaMask
2. **Connect wallet**
3. **View all certificates** owned by your address
4. **View/Download PDFs** of your certificates
5. **See complete details** including course, grade, and issue date

### Verifier Portal (`/verifier`)

1. **Enter wallet address** to verify
2. **Click "Verify Certificates"**
3. **View blockchain-verified certificates** for that address
4. **View/Download certificate PDFs**
5. **No account required** - verification is public and instant

## Deployment

### Local Development (Current Setup)

The application is currently configured for local development with a Hardhat blockchain node.

### Testnet Deployment (Recommended for Testing)

1. **Update `hardhat.config.js`** with testnet configuration:
   ```javascript
   networks: {
     sepolia: {
       url: process.env.SEPOLIA_RPC_URL,
       accounts: [process.env.PRIVATE_KEY]
     }
   }
   ```

2. **Add environment variables**:
   ```env
   SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
   PRIVATE_KEY=your_wallet_private_key
   ```

3. **Deploy to testnet**:
   ```bash
   npx hardhat run scripts/deploy.js --network sepolia
   ```

4. **Update frontend configuration** with new contract address

### Production Deployment (Mainnet)

**Warning: Production deployment requires careful security considerations**

1. **Use hardware wallet** for contract deployment
2. **Conduct security audit** of smart contracts
3. **Store metadata on IPFS** instead of local storage
4. **Implement access control** for admin functions
5. **Add comprehensive testing**
6. **Deploy frontend** to Vercel/Netlify
7. **Update RPC endpoints** to mainnet providers

### Environment Variables for Production

- `ETHEREUM_RPC_URL`: Mainnet RPC endpoint
- `CONTRACT_ADDRESS`: Deployed contract address
- `IPFS_GATEWAY`: IPFS gateway URL
- `ADMIN_ADDRESSES`: Authorized admin wallet addresses

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- **Email**: pranavmurali024@gmail.com
- **GitHub**: [https://github.com/marvellousz/proofly](https://github.com/marvellousz/proofly)

---

Built with blockchain technology for a more trustworthy future in digital credentials.
