import hre from "hardhat";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  console.log("Deploying CertificateNFT contract...");

  const CertificateNFT = await hre.ethers.getContractFactory("CertificateNFT");
  const certificate = await CertificateNFT.deploy();

  await certificate.waitForDeployment();

  const contractAddress = await certificate.getAddress();
  console.log(`CertificateNFT deployed to: ${contractAddress}`);

  const config = {
    contractAddress: contractAddress,
    chainId: 31337,
    network: "localhost"
  };

  const configPath = path.join(__dirname, "../src/config/contract.json");
  const configDir = path.dirname(configPath);

  if (!fs.existsSync(configDir)) {
    fs.mkdirSync(configDir, { recursive: true });
  }

  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
  console.log("Contract config saved to src/config/contract.json");

  const artifactPath = path.join(__dirname, "../artifacts/contracts/CertificateNFT.sol/CertificateNFT.json");
  const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));
  const abiPath = path.join(__dirname, "../src/config/abi.json");

  fs.writeFileSync(abiPath, JSON.stringify(artifact.abi, null, 2));
  console.log("ABI saved to src/config/abi.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
