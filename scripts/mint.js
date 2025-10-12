import hre from "hardhat";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const contractConfig = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../src/config/contract.json"), "utf8")
  );

  const CertificateNFT = await hre.ethers.getContractFactory("CertificateNFT");
  const certificate = CertificateNFT.attach(contractConfig.contractAddress);

  const [deployer] = await hre.ethers.getSigners();
  const studentAddress = process.argv[2] || deployer.address;

  const metadata = {
    name: "Certificate of Completion",
    description: "Awarded to Alice for completing Blockchain 101",
    studentName: "Alice Johnson",
    course: "Blockchain 101",
    grade: "A",
    issueDate: new Date().toISOString().split('T')[0],
    university: "Example University"
  };

  const metadataDir = path.join(__dirname, "../public/metadata");
  if (!fs.existsSync(metadataDir)) {
    fs.mkdirSync(metadataDir, { recursive: true });
  }

  const tokenId = 0;
  const metadataPath = path.join(metadataDir, `${tokenId}.json`);
  fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));

  const tokenURI = `http://localhost:5173/metadata/${tokenId}.json`;

  console.log("Minting certificate...");
  const tx = await certificate.mintCertificate(studentAddress, tokenURI);
  await tx.wait();

  console.log(`Certificate minted to: ${studentAddress}`);
  console.log(`Token ID: ${tokenId}`);
  console.log(`Token URI: ${tokenURI}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
