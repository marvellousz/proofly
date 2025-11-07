import { useState, useEffect } from 'react';
import { Shield, Send, AlertCircle } from 'lucide-react';
import WalletConnect from '../components/WalletConnect';
import { connectWallet, getContract, getProvider } from '../lib/blockchain';
import { CertificateMetadata } from '../types';

export default function AdminPage() {
  const [adminAddress, setAdminAddress] = useState<string | null>(null);
  const [contractOwner, setContractOwner] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    studentAddress: '',
    studentName: '',
    course: '',
    grade: '',
    issueDate: new Date().toISOString().split('T')[0],
    university: '',
  });
  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const [isMinting, setIsMinting] = useState(false);
  const [mintedTokenId, setMintedTokenId] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setCertificateFile(file);
    } else {
      alert('Please select a PDF file');
      e.target.value = '';
    }
  };

  // Fetch contract owner when wallet connects
  useEffect(() => {
    const fetchContractOwner = async () => {
      try {
        const provider = getProvider();
        if (provider) {
          const contract = await getContract(provider);
          const owner = await contract.owner();
          setContractOwner(owner);
        }
      } catch (error) {
        console.error('Failed to fetch contract owner:', error);
      }
    };

    fetchContractOwner();
  }, [adminAddress]);

  const handleMint = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminAddress) {
      alert('Please connect your wallet');
      return;
    }

    setIsMinting(true);
    setMintedTokenId(null);

    try {
      const { signer } = await connectWallet();
      const contract = await getContract(signer);
      const connectedAddress = await signer.getAddress();

      // Check if connected wallet is the contract owner
      const contractOwner = await contract.owner();
      if (connectedAddress.toLowerCase() !== contractOwner.toLowerCase()) {
        alert(
          `❌ Error: You are not the contract owner!\n\n` +
          `Connected address: ${connectedAddress}\n` +
          `Contract owner: ${contractOwner}\n\n` +
          `Please switch to the admin account (Account #0) in MetaMask.\n` +
          `This is the account that deployed the contract.`
        );
        setIsMinting(false);
        return;
      }

      const metadata: CertificateMetadata = {
        name: 'Certificate of Completion',
        description: `Awarded to ${formData.studentName} for completing ${formData.course}`,
        studentName: formData.studentName,
        course: formData.course,
        grade: formData.grade,
        issueDate: formData.issueDate,
        university: formData.university,
      };

      const tokenId = Math.floor(Date.now() / 1000);
      
      // Handle PDF file upload
      let pdfPath = '';
      if (certificateFile) {
        // In a real app, you'd upload to IPFS or a server
        // For now, we'll simulate by copying to public/certificates/
        pdfPath = `http://localhost:5173/certificates/${tokenId}.pdf`;
      }

      // Add PDF path to metadata
      const metadataWithPdf = { ...metadata, pdfPath };
      
      const metadataJSON = JSON.stringify(metadataWithPdf, null, 2);
      const tokenURI = `http://localhost:5173/metadata/${tokenId}.json`;

      // Mint the certificate on blockchain
      const tx = await contract.mintCertificate(formData.studentAddress, tokenURI);
      await tx.wait();

      // Download JSON metadata file first
      const jsonBlob = new Blob([metadataJSON], { type: 'application/json' });
      const jsonUrl = URL.createObjectURL(jsonBlob);
      const jsonLink = document.createElement('a');
      jsonLink.href = jsonUrl;
      jsonLink.download = `${tokenId}.json`;
      document.body.appendChild(jsonLink);
      jsonLink.click();
      document.body.removeChild(jsonLink);
      
      // Clean up URL after a short delay
      setTimeout(() => URL.revokeObjectURL(jsonUrl), 100);

      // Download PDF file with a delay (browsers block multiple simultaneous downloads)
      if (certificateFile) {
        setTimeout(() => {
          const pdfBlob = new Blob([certificateFile], { type: 'application/pdf' });
          const pdfUrl = URL.createObjectURL(pdfBlob);
          const pdfLink = document.createElement('a');
          pdfLink.href = pdfUrl;
          pdfLink.download = `${tokenId}.pdf`;
          document.body.appendChild(pdfLink);
          pdfLink.click();
          document.body.removeChild(pdfLink);
          setTimeout(() => URL.revokeObjectURL(pdfUrl), 100);
        }, 500); // 500ms delay to avoid browser blocking
      }

      setMintedTokenId(tokenId.toString());

      setFormData({
        studentAddress: '',
        studentName: '',
        course: '',
        grade: '',
        issueDate: new Date().toISOString().split('T')[0],
        university: '',
      });
      setCertificateFile(null);

      alert(`Certificate minted successfully! Token ID: ${tokenId}\n\nFiles are downloading:\n- JSON metadata file (downloaded now)\n${certificateFile ? '- PDF certificate file (downloading in 0.5s)\n' : ''}\nPlease save both files to:\n- public/metadata/${tokenId}.json\n${certificateFile ? `- public/certificates/${tokenId}.pdf\n` : ''}`);
    } catch (error: any) {
      console.error(error);
      
      // Handle specific error cases
      let errorMessage = 'Failed to mint certificate';
      
      if (error.data) {
        // Check for OwnableUnauthorizedAccount error (0x118cdaa7)
        const errorData = typeof error.data === 'string' ? error.data : error.data.data || error.data.toString();
        if (errorData && errorData.includes('0x118cdaa7')) {
          errorMessage = 
            '❌ Error: You are not the contract owner!\n\n' +
            'Please switch to the admin account (Account #0) in MetaMask.\n' +
            'This is the account that deployed the contract.';
        } else if (error.message) {
          errorMessage = error.message;
        }
      } else if (error.message) {
        errorMessage = error.message;
        
        // Check for common error messages
        if (error.message.includes('execution reverted') || error.message.includes('OwnableUnauthorizedAccount')) {
          errorMessage = 
            '❌ Error: You are not the contract owner!\n\n' +
            'Please switch to the admin account (Account #0) in MetaMask.\n' +
            'This is the account that deployed the contract.';
        }
      }
      
      alert(errorMessage);
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
      <nav className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield size={28} className="text-blue-500" />
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          </div>
          <WalletConnect onConnect={setAdminAddress} connectedAddress={adminAddress} />
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-8 border border-white/10 shadow-2xl backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white mb-6">Issue New Certificate</h2>

          {!adminAddress ? (
            <div className="text-center py-12">
              <Shield size={64} className="mx-auto text-slate-600 mb-4" />
              <p className="text-gray-400 text-lg">Connect your admin wallet to mint certificates</p>
            </div>
          ) : (
            <form onSubmit={handleMint} className="space-y-6">
              {contractOwner && adminAddress && adminAddress.toLowerCase() !== contractOwner.toLowerCase() && (
                <div className="bg-red-900/30 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg backdrop-blur-sm flex items-start gap-3">
                  <AlertCircle size={20} className="mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold mb-1">⚠️ Warning: Connected wallet is not the contract owner</p>
                    <p className="text-sm text-red-300/80 mb-2">
                      You can only mint certificates with the account that deployed the contract.
                    </p>
                    <div className="text-xs font-mono space-y-1 mt-2">
                      <p><span className="text-red-300">Connected:</span> {adminAddress}</p>
                      <p><span className="text-red-300">Contract Owner:</span> {contractOwner}</p>
                    </div>
                    <p className="text-sm text-red-300/80 mt-2">
                      Please switch to Account #0 (the deployer account) in MetaMask to mint certificates.
                    </p>
                  </div>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Student Wallet Address
                </label>
                <input
                  type="text"
                  name="studentAddress"
                  value={formData.studentAddress}
                  onChange={handleInputChange}
                  placeholder="0x..."
                  required
                  className="w-full bg-slate-700/50 text-white px-4 py-3 rounded-lg border border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all backdrop-blur-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Student Name
                </label>
                <input
                  type="text"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  required
                  className="w-full bg-slate-700/50 text-white px-4 py-3 rounded-lg border border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all backdrop-blur-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Course Name
                </label>
                <input
                  type="text"
                  name="course"
                  value={formData.course}
                  onChange={handleInputChange}
                  placeholder="Blockchain 101"
                  required
                  className="w-full bg-slate-700/50 text-white px-4 py-3 rounded-lg border border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all backdrop-blur-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Grade
                </label>
                <select
                  name="grade"
                  value={formData.grade}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-700/50 text-white px-4 py-3 rounded-lg border border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all backdrop-blur-sm"
                >
                  <option value="">Select Grade</option>
                  <option value="A+">A+</option>
                  <option value="A">A</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B">B</option>
                  <option value="B-">B-</option>
                  <option value="C+">C+</option>
                  <option value="C">C</option>
                  <option value="Pass">Pass</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  University Name
                </label>
                <input
                  type="text"
                  name="university"
                  value={formData.university}
                  onChange={handleInputChange}
                  placeholder="MIT, Stanford University, etc."
                  required
                  className="w-full bg-slate-700/50 text-white px-4 py-3 rounded-lg border border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all backdrop-blur-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Issue Date
                </label>
                <input
                  type="date"
                  name="issueDate"
                  value={formData.issueDate}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-slate-700/50 text-white px-4 py-3 rounded-lg border border-white/10 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all backdrop-blur-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Certificate Document (PDF)
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                />
                {certificateFile && (
                  <p className="text-green-400 text-sm mt-2">
                    ✓ Selected: {certificateFile.name}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isMinting}
                className="w-full bg-gradient-to-r from-blue-500 to-slate-500 hover:from-blue-600 hover:to-slate-600 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
                {isMinting ? 'Minting...' : 'Mint Certificate'}
              </button>

              {mintedTokenId && (
                <div className="bg-green-900/30 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg backdrop-blur-sm">
                  Certificate minted successfully! Token ID: {mintedTokenId}
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
