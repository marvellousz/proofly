# Quick Start Guide

Get your NFT Certificate Issuer running in 5 minutes!

## Prerequisites

- Node.js installed
- MetaMask browser extension installed

## Step-by-Step Setup

### 1. Install Dependencies (30 seconds)

```bash
npm install --legacy-peer-deps
```

### 2. Start Local Blockchain (Terminal 1)

Open a terminal and run:

```bash
npm run blockchain
```

You'll see output like:

```
Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/

Accounts
========
Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
...
```

**Keep this terminal running!** Note down Account #0's private key.

### 3. Deploy Smart Contract (Terminal 2)

Open a new terminal:

```bash
npm run deploy
```

You should see:

```
Deploying CertificateNFT contract...
CertificateNFT deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
Contract config saved to src/config/contract.json
ABI saved to src/config/abi.json
```

### 4. Configure MetaMask (2 minutes)

#### Add Local Network

1. Open MetaMask
2. Click network dropdown (top center)
3. Click "Add Network" → "Add a network manually"
4. Enter:
   - **Network Name**: `Localhost 8545`
   - **RPC URL**: `http://127.0.0.1:8545`
   - **Chain ID**: `1337`
   - **Currency Symbol**: `ETH`
5. Click "Save"

#### Import Test Account

1. In MetaMask, click account icon (top right)
2. Select "Import Account"
3. Paste the private key from Step 2 (Account #0)
4. Click "Import"

You now have 10,000 test ETH!

### 5. Start Frontend (Terminal 3)

```bash
npm run dev
```

Visit: `http://localhost:5173`

## Using the Application

### Mint Your First Certificate (Admin)

1. Go to `http://localhost:5173/admin`
2. Click "Connect Wallet" (should auto-connect if you're on localhost network)
3. Fill in the form:
   - **Student Wallet Address**: Use another account from the Hardhat output (or create a new MetaMask account)
   - **Student Name**: `Alice Johnson`
   - **Course Name**: `Blockchain 101`
   - **Grade**: `A`
   - **Issue Date**: Today's date
4. Click "Mint Certificate"
5. Confirm transaction in MetaMask
6. A JSON file will download - save it to `public/metadata/` directory

### View Certificates (Student)

1. Switch to the student account in MetaMask (the address you minted to)
2. Go to `http://localhost:5173/student`
3. Connect wallet
4. See your certificate!

### Verify Certificates (Employer)

1. Go to `http://localhost:5173/verifier`
2. Enter the student's wallet address
3. Click "Verify Certificates"
4. See all verified certificates

## Troubleshooting

### "Invalid Nonce" Error
- MetaMask → Settings → Advanced → Clear activity tab data

### "Contract Not Found"
- Make sure Terminal 1 (blockchain) is still running
- Redeploy: `npm run deploy`

### Wrong Network
- Check MetaMask is on "Localhost 8545"
- Chain ID should be 1337

### Transaction Fails
- Ensure you're using the correct account
- Check you have test ETH

## Architecture Overview

```
┌─────────────┐
│   Admin     │  → Mints certificates as ERC-721 NFTs
│ (University)│
└─────────────┘
      ↓
┌─────────────┐
│  Blockchain │  → Hardhat local node (http://127.0.0.1:8545)
│  (Ethereum) │  → Stores ownership & metadata URIs
└─────────────┘
      ↑
┌─────────────┐
│   Student   │  → Owns certificates in wallet
└─────────────┘
      ↑
┌─────────────┐
│  Verifier   │  → Checks blockchain for authenticity
│ (Employer)  │
└─────────────┘
```

## What You Built

- ✅ Full ERC-721 NFT smart contract
- ✅ Local blockchain with 20 test accounts
- ✅ Admin dashboard for issuing certificates
- ✅ Student dashboard for viewing certificates
- ✅ Verifier dashboard for checking authenticity
- ✅ MetaMask integration
- ✅ Certificate revocation system
- ✅ Tamper-proof, immutable records

## Next Steps

- Read [SETUP.md](./SETUP.md) for detailed documentation
- Read [README.md](./README.md) for feature overview
- Mint multiple certificates to different addresses
- Test the revocation feature
- Explore the smart contract code

## Need Help?

Check the detailed setup guide in [SETUP.md](./SETUP.md)

---

**Congratulations! You now have a working blockchain-based certificate system! 🎉**
