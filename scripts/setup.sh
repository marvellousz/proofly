#!/bin/bash

echo "🚀 NFT Certificate Issuer - Quick Setup Script"
echo "=============================================="
echo ""

echo "📦 Installing dependencies..."
npm install --legacy-peer-deps
echo "✅ Dependencies installed"
echo ""

echo "⛓️  Please ensure Hardhat node is running in another terminal:"
echo "   Run: npx hardhat node"
echo ""
read -p "Press Enter once Hardhat node is running..."
echo ""

echo "📝 Deploying smart contract..."
npx hardhat run scripts/deploy.js --network localhost

if [ $? -eq 0 ]; then
    echo "✅ Contract deployed successfully!"
    echo ""
    echo "🎉 Setup complete! Next steps:"
    echo ""
    echo "1. Configure MetaMask:"
    echo "   - Network Name: Localhost 8545"
    echo "   - RPC URL: http://127.0.0.1:8545"
    echo "   - Chain ID: 1337"
    echo ""
    echo "2. Import a test account from Hardhat node output"
    echo ""
    echo "3. Start the development server:"
    echo "   npm run dev"
    echo ""
    echo "4. Visit http://localhost:5173"
else
    echo "❌ Contract deployment failed. Please check that Hardhat node is running."
fi
