import { useState, useEffect } from 'react';
import { GraduationCap } from 'lucide-react';
import WalletConnect from '../components/WalletConnect';
import CertificateCard from '../components/CertificateCard';
import { connectWallet, getContract } from '../lib/blockchain';
import { Certificate, CertificateMetadata } from '../types';

export default function StudentPage() {
  const [studentAddress, setStudentAddress] = useState<string | null>(null);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCertificates = async (address: string) => {
    setIsLoading(true);
    try {
      const { provider } = await connectWallet();
      const contract = await getContract(provider);

      const tokenIds = await contract.getCertificatesByOwner(address);

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
      alert(error.message || 'Failed to fetch certificates');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (studentAddress) {
      fetchCertificates(studentAddress);
    } else {
      setCertificates([]);
    }
  }, [studentAddress]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
      <nav className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GraduationCap size={28} className="text-slate-500" />
            <h1 className="text-2xl font-bold text-white">My Certificates</h1>
          </div>
          <WalletConnect onConnect={setStudentAddress} connectedAddress={studentAddress} />
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {!studentAddress ? (
          <div className="text-center py-20">
            <GraduationCap size={80} className="mx-auto text-slate-600 mb-6" />
            <h2 className="text-3xl font-bold text-white mb-3">View Your Certificates</h2>
            <p className="text-gray-400 text-lg mb-8">
              Connect your wallet to see all certificates issued to you
            </p>
          </div>
        ) : isLoading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-slate-500 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading certificates...</p>
          </div>
        ) : certificates.length === 0 ? (
          <div className="text-center py-20">
            <GraduationCap size={80} className="mx-auto text-slate-600 mb-6" />
            <h2 className="text-2xl font-bold text-white mb-3">No Certificates Yet</h2>
            <p className="text-gray-400">You don't have any certificates in this wallet</p>
          </div>
        ) : (
          <div>
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Your Certificates</h2>
              <p className="text-gray-400">
                You have {certificates.length} certificate{certificates.length !== 1 ? 's' : ''}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((cert) => (
                <CertificateCard key={cert.tokenId} certificate={cert} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
