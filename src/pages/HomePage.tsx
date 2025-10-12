import { Shield, GraduationCap, ShieldCheck, ArrowRight, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <nav className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <Award size={32} className="text-blue-500" />
            <h1 className="text-2xl font-bold text-white">NFT Certificate Issuer</h1>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Tamper-Proof Digital
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
              Certificates on Blockchain
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Issue, manage, and verify educational certificates as NFTs using Ethereum blockchain.
            Fully offline, cost-free local development environment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Link
            to="/admin"
            className="group bg-gradient-to-br from-blue-900/50 to-blue-800/30 border-2 border-blue-700 rounded-2xl p-8 hover:border-blue-500 transition-all hover:scale-105"
          >
            <div className="bg-blue-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-500 transition-colors">
              <Shield size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Admin Portal</h3>
            <p className="text-gray-400 mb-4">
              Issue new certificates to students by minting ERC-721 NFTs with metadata
            </p>
            <div className="flex items-center gap-2 text-blue-400 font-semibold group-hover:gap-3 transition-all">
              <span>Access Dashboard</span>
              <ArrowRight size={20} />
            </div>
          </Link>

          <Link
            to="/student"
            className="group bg-gradient-to-br from-green-900/50 to-green-800/30 border-2 border-green-700 rounded-2xl p-8 hover:border-green-500 transition-all hover:scale-105"
          >
            <div className="bg-green-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-500 transition-colors">
              <GraduationCap size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Student Portal</h3>
            <p className="text-gray-400 mb-4">
              View all certificates owned by your wallet address with full metadata
            </p>
            <div className="flex items-center gap-2 text-green-400 font-semibold group-hover:gap-3 transition-all">
              <span>View Certificates</span>
              <ArrowRight size={20} />
            </div>
          </Link>

          <Link
            to="/verifier"
            className="group bg-gradient-to-br from-yellow-900/50 to-yellow-800/30 border-2 border-yellow-700 rounded-2xl p-8 hover:border-yellow-500 transition-all hover:scale-105"
          >
            <div className="bg-yellow-600 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-yellow-500 transition-colors">
              <ShieldCheck size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Verifier Portal</h3>
            <p className="text-gray-400 mb-4">
              Verify certificate authenticity by checking ownership on the blockchain
            </p>
            <div className="flex items-center gap-2 text-yellow-400 font-semibold group-hover:gap-3 transition-all">
              <span>Verify Now</span>
              <ArrowRight size={20} />
            </div>
          </Link>
        </div>

        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
          <h2 className="text-2xl font-bold text-white mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex gap-4">
              <div className="bg-blue-600/20 p-3 rounded-lg h-fit">
                <Shield size={24} className="text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Tamper-Proof</h3>
                <p className="text-gray-400">
                  Certificates stored on blockchain cannot be forged or altered
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-green-600/20 p-3 rounded-lg h-fit">
                <Award size={24} className="text-green-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">ERC-721 Standard</h3>
                <p className="text-gray-400">
                  Built using industry-standard NFT protocol with OpenZeppelin
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-purple-600/20 p-3 rounded-lg h-fit">
                <GraduationCap size={24} className="text-purple-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Student Ownership</h3>
                <p className="text-gray-400">
                  Students truly own their certificates in their wallet forever
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="bg-yellow-600/20 p-3 rounded-lg h-fit">
                <ShieldCheck size={24} className="text-yellow-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Instant Verification</h3>
                <p className="text-gray-400">
                  Employers can verify authenticity directly on the blockchain
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
