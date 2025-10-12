import { useState } from 'react';
import { ShieldCheck, Search } from 'lucide-react';
import CertificateCard from '../components/CertificateCard';
import { getProvider, getContract } from '../lib/blockchain';
import { Certificate, CertificateMetadata } from '../types';

export default function VerifierPage() {
  const [walletAddress, setWalletAddress] = useState('');
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walletAddress.trim()) {
      alert('Please enter a wallet address');
      return;
    }

    setIsVerifying(true);
    setHasSearched(true);

    try {
      const provider = getProvider();
      if (!provider) {
        throw new Error('Please install MetaMask');
      }

      const contract = await getContract(provider);
      const tokenIds = await contract.getCertificatesByOwner(walletAddress);

      const certs: Certificate[] = await Promise.all(
        tokenIds.map(async (tokenId: bigint) => {
          const tokenURI = await contract.tokenURI(tokenId);
          const isRevoked = await contract.isRevoked(tokenId);

          let metadata: CertificateMetadata | null = null;
          try {
            const response = await fetch(tokenURI);
            if (response.ok) {
              metadata = await response.json();
            }
          } catch (error) {
            console.error('Failed to fetch metadata:', error);
          }

          return {
            tokenId: Number(tokenId),
            metadata,
            tokenURI,
            isRevoked,
          };
        })
      );

      setCertificates(certs);
    } catch (error: any) {
      console.error(error);
      alert(error.message || 'Failed to verify certificates');
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <nav className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <ShieldCheck size={28} className="text-yellow-500" />
            <h1 className="text-2xl font-bold text-white">Certificate Verifier</h1>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto mb-12">
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Verify Certificate Authenticity</h2>
            <p className="text-gray-400 mb-6">
              Enter a wallet address to verify all certificates owned by that address on the blockchain
            </p>

            <form onSubmit={handleVerify} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Wallet Address
                </label>
                <input
                  type="text"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  placeholder="0x..."
                  className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500 outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Search size={20} />
                {isVerifying ? 'Verifying...' : 'Verify Certificates'}
              </button>
            </form>
          </div>
        </div>

        {isVerifying ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Verifying on blockchain...</p>
          </div>
        ) : hasSearched && certificates.length === 0 ? (
          <div className="text-center py-12">
            <ShieldCheck size={80} className="mx-auto text-gray-600 mb-6" />
            <h2 className="text-2xl font-bold text-white mb-3">No Certificates Found</h2>
            <p className="text-gray-400">This wallet address does not own any certificates</p>
          </div>
        ) : certificates.length > 0 ? (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Verified Certificates</h2>
              <p className="text-gray-400">
                Found {certificates.length} certificate{certificates.length !== 1 ? 's' : ''} on blockchain
              </p>
              <div className="mt-4 inline-flex items-center gap-2 bg-green-900/30 border border-green-500 text-green-400 px-4 py-2 rounded-lg">
                <ShieldCheck size={20} />
                <span className="font-medium">Blockchain Verified</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((cert) => (
                <CertificateCard key={cert.tokenId} certificate={cert} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
