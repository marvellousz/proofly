# 🚀 START HERE

Welcome to the NFT Certificate Issuer! This is your entry point.

## What You Have

A complete blockchain-based certificate system with:
- ✅ Smart contract (Solidity)
- ✅ Local blockchain (Hardhat)
- ✅ React frontend
- ✅ MetaMask integration
- ✅ Complete documentation

## Quick Start (3 Commands)

### Terminal 1: Start Blockchain
```bash
npm install --legacy-peer-deps
npm run blockchain
```
Keep this running. Copy one of the private keys shown.

### Terminal 2: Deploy Contract
```bash
npm run deploy
```

### Terminal 3: Start Frontend
```bash
npm run dev
```
Visit: http://localhost:5173

## Configure MetaMask

1. Add network: Localhost 8545, RPC: http://127.0.0.1:8545, Chain: 1337
2. Import account using private key from Terminal 1
3. You now have 10,000 test ETH!

## What to Read Next

**New to the project?**
→ Read [QUICKSTART.md](./QUICKSTART.md) (5 minutes)

**Want to understand everything?**
→ Read [SETUP.md](./SETUP.md) (comprehensive guide)

**Want to see it in action?**
→ Follow [DEMO.md](./DEMO.md) (step-by-step demo)

**Want technical details?**
→ Read [README.md](./README.md) (main documentation)

**Want the big picture?**
→ Read [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) (complete overview)

## Three Portals

1. **Admin** (http://localhost:5173/admin)
   - Mint certificates to student wallets
   - Requires admin wallet (Account #0)

2. **Student** (http://localhost:5173/student)
   - View your owned certificates
   - Requires student wallet

3. **Verifier** (http://localhost:5173/verifier)
   - Verify any address's certificates
   - No wallet needed

## Need Help?

1. Is blockchain running? Check Terminal 1
2. Is contract deployed? Check Terminal 2
3. Is MetaMask on localhost network?
4. Did you import a test account?

## Common Issues

❌ **"Contract Not Found"**
→ Run `npm run deploy` again

❌ **"Invalid Nonce"**
→ MetaMask → Settings → Advanced → Clear activity

❌ **"Wrong Network"**
→ Switch MetaMask to "Localhost 8545"

## Project Stats

- 📝 76 lines of Solidity
- ⚛️ 831 lines of React/TypeScript
- 📚 5 documentation files
- 🎨 4 page components
- 🔧 2 utility components
- ✨ 1 awesome blockchain app

## What Makes This Special?

🔒 **Tamper-Proof**: Certificates can't be forged or altered
💰 **Cost-Free**: Runs entirely on local blockchain
⚡ **Instant**: No waiting for transactions
🎓 **Real Ownership**: Students truly own their certificates
✅ **Verified**: Anyone can verify authenticity instantly

## Ready?

```bash
# In 3 terminals, run:
npm run blockchain    # Terminal 1
npm run deploy        # Terminal 2
npm run dev           # Terminal 3
```

Then visit http://localhost:5173 and start minting certificates!

---

**Questions? Check the documentation files listed above!**
