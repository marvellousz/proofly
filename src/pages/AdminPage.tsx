import { useState } from 'react';
import { Shield, Send } from 'lucide-react';
import WalletConnect from '../components/WalletConnect';
import { connectWallet, getContract } from '../lib/blockchain';
import { CertificateMetadata } from '../types';

export default function AdminPage() {
  const [adminAddress, setAdminAddress] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    studentAddress: '',
    studentName: '',
    course: '',
    grade: '',
    issueDate: new Date().toISOString().split('T')[0],
  });
  const [isMinting, setIsMinting] = useState(false);
  const [mintedTokenId, setMintedTokenId] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

      const metadata: CertificateMetadata = {
        name: 'Certificate of Completion',
        description: `Awarded to ${formData.studentName} for completing ${formData.course}`,
        studentName: formData.studentName,
        course: formData.course,
        grade: formData.grade,
        issueDate: formData.issueDate,
        university: 'Example University',
      };

      const tokenId = Math.floor(Date.now() / 1000);
      const metadataJSON = JSON.stringify(metadata, null, 2);
      const blob = new Blob([metadataJSON], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      const tokenURI = `http://localhost:5173/metadata/${tokenId}.json`;

      const tx = await contract.mintCertificate(formData.studentAddress, tokenURI);
      await tx.wait();

      const link = document.createElement('a');
      link.href = url;
      link.download = `${tokenId}.json`;
      link.click();

      setMintedTokenId(tokenId.toString());

      setFormData({
        studentAddress: '',
        studentName: '',
        course: '',
        grade: '',
        issueDate: new Date().toISOString().split('T')[0],
      });

      alert(`Certificate minted successfully! Token ID: ${tokenId}\nMetadata file downloaded. Please place it in public/metadata/ directory.`);
    } catch (error: any) {
      console.error(error);
      alert(error.message || 'Failed to mint certificate');
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <nav className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield size={28} className="text-blue-500" />
            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          </div>
          <WalletConnect onConnect={setAdminAddress} connectedAddress={adminAddress} />
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-6">Issue New Certificate</h2>

          {!adminAddress ? (
            <div className="text-center py-12">
              <Shield size={64} className="mx-auto text-gray-600 mb-4" />
              <p className="text-gray-400 text-lg">Connect your admin wallet to mint certificates</p>
            </div>
          ) : (
            <form onSubmit={handleMint} className="space-y-6">
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
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
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
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
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
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
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
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
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
                  Issue Date
                </label>
                <input
                  type="date"
                  name="issueDate"
                  value={formData.issueDate}
                  onChange={handleInputChange}
                  required
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isMinting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
                {isMinting ? 'Minting...' : 'Mint Certificate'}
              </button>

              {mintedTokenId && (
                <div className="bg-green-900/30 border border-green-500 text-green-400 px-4 py-3 rounded-lg">
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
