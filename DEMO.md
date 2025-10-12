# Live Demo Walkthrough

This guide walks you through a complete demo of the NFT Certificate Issuer.

## Prerequisites

- Hardhat blockchain running (`npm run blockchain`)
- Contract deployed (`npm run deploy`)
- MetaMask configured with localhost network
- Frontend running (`npm run dev`)

## Demo Scenario

**University**: Example University
**Course**: Blockchain Development 101
**Students**: Alice, Bob, Charlie
**Employer**: TechCorp HR Department

## Step 1: Setup Test Accounts

### Import 4 Accounts from Hardhat

From your Hardhat terminal output, import these accounts to MetaMask:

1. **Account #0** (Admin/University)
   - Address: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
   - Role: University Admin (contract deployer)

2. **Account #1** (Alice - Student)
   - Address: `0x70997970C51812dc3A010C7d01b50e0d17dc79C8`
   - Role: Student receiving certificate

3. **Account #2** (Bob - Student)
   - Address: `0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC`
   - Role: Student receiving certificate

4. **Account #3** (Charlie - Verifier)
   - Address: `0x90F79bf6EB2c4f870365E785982E1f101E93b906`
   - Role: Employer/Verifier

## Step 2: Admin Issues Certificates

### Mint Certificate for Alice

1. Switch to **Account #0** in MetaMask
2. Go to `http://localhost:5173/admin`
3. Click "Connect Wallet"
4. Fill in the form:
   ```
   Student Wallet Address: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
   Student Name: Alice Johnson
   Course Name: Blockchain Development 101
   Grade: A+
   Issue Date: 2025-10-12
   ```
5. Click "Mint Certificate"
6. Confirm transaction in MetaMask
7. Save the downloaded JSON file to `public/metadata/`

### Mint Certificate for Bob

1. Still as **Account #0**
2. Fill in the form:
   ```
   Student Wallet Address: 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
   Student Name: Bob Smith
   Course Name: Blockchain Development 101
   Grade: A
   Issue Date: 2025-10-12
   ```
3. Click "Mint Certificate"
4. Confirm transaction
5. Save the downloaded JSON file to `public/metadata/`

## Step 3: Students View Their Certificates

### Alice Views Her Certificate

1. Switch to **Account #1** (Alice) in MetaMask
2. Go to `http://localhost:5173/student`
3. Click "Connect Wallet"
4. See Alice's certificate displayed:
   - Course: Blockchain Development 101
   - Grade: A+
   - Date: 2025-10-12
   - Token ID: #0

### Bob Views His Certificate

1. Switch to **Account #2** (Bob) in MetaMask
2. Go to `http://localhost:5173/student`
3. Click "Connect Wallet"
4. See Bob's certificate displayed:
   - Course: Blockchain Development 101
   - Grade: A
   - Date: 2025-10-12
   - Token ID: #1

## Step 4: Employer Verifies Certificates

### Verify Alice's Credentials

1. Switch to **Account #3** (Charlie - HR) or stay disconnected
2. Go to `http://localhost:5173/verifier`
3. Enter Alice's address: `0x70997970C51812dc3A010C7d01b50e0d17dc79C8`
4. Click "Verify Certificates"
5. See Alice's verified certificate with "Blockchain Verified" badge

### Verify Bob's Credentials

1. Enter Bob's address: `0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC`
2. Click "Verify Certificates"
3. See Bob's verified certificate

### Try Invalid Address

1. Enter a random address: `0x0000000000000000000000000000000000000000`
2. Click "Verify Certificates"
3. See "No Certificates Found" message

## Step 5: Test Certificate Ownership

### Try to View Someone Else's Certificates

1. While connected as **Account #3** (Charlie)
2. Go to `http://localhost:5173/student`
3. Connect wallet
4. See "No Certificates Yet" - Charlie doesn't own any certificates

This proves certificates are tied to specific wallet addresses!

## Step 6: Test Revocation (Optional)

### Revoke a Certificate

This requires interacting with the contract directly. Here's how:

1. Create a new script `scripts/revoke.js`:

```javascript
import hre from "hardhat";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const config = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../src/config/contract.json"), "utf8")
  );

  const CertificateNFT = await hre.ethers.getContractFactory("CertificateNFT");
  const certificate = CertificateNFT.attach(config.contractAddress);

  const tokenId = process.argv[2] || 0;

  console.log(`Revoking certificate #${tokenId}...`);
  const tx = await certificate.revokeCertificate(tokenId);
  await tx.wait();

  console.log(`Certificate #${tokenId} revoked successfully`);
}

main().catch(console.error);
```

2. Run: `npx hardhat run scripts/revoke.js --network localhost 0`
3. Refresh Alice's student dashboard
4. See the certificate marked as "REVOKED"

## Demo Key Points to Highlight

### 🔒 Security & Immutability

- Once minted, certificate data cannot be altered
- Ownership is cryptographically secured
- Only the contract owner (university) can mint or revoke

### ✅ Instant Verification

- Anyone can verify certificate authenticity
- No need to contact the university
- Direct blockchain proof

### 💰 Cost-Free (Local)

- No gas fees on local network
- Instant transactions
- Perfect for development and testing

### 🎯 Decentralized Ownership

- Students truly own their certificates
- Can be transferred (if needed)
- Stored in their wallet forever

## Real-World Production Considerations

After the demo, discuss:

1. **Gas Costs**: On mainnet, minting costs ~$10-50 per certificate
2. **IPFS Storage**: Metadata should be on IPFS, not localhost
3. **Scalability**: Batch minting for multiple students
4. **Privacy**: Consider zero-knowledge proofs for sensitive data
5. **Standards**: W3C Verifiable Credentials integration

## Common Demo Questions

**Q: Can certificates be fake?**
A: No, only the contract owner can mint. The blockchain proves authenticity.

**Q: What if I lose my wallet?**
A: Use wallet recovery phrases. Consider social recovery wallets for students.

**Q: Can certificates be transferred?**
A: Yes, ERC-721 allows transfers. This can be disabled if needed.

**Q: What about offline verification?**
A: Use QR codes with blockchain links. Verifiers can check online anytime.

**Q: How many certificates can be issued?**
A: Unlimited. Each has a unique token ID (auto-incrementing).

## Cleanup

To reset the demo:

1. Stop Hardhat node (Ctrl+C)
2. Restart: `npm run blockchain`
3. Redeploy: `npm run deploy`
4. Clear MetaMask activity: Settings → Advanced → Clear activity tab data

---

**Demo Complete! You've shown a full blockchain-based credential system!** 🎉
