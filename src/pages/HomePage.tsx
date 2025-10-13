import { Shield, GraduationCap, ShieldCheck, ArrowRight, Award, Sparkles, Lock, Users, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-slate-500/5 rounded-full blur-3xl"></div>
      
      <nav className="relative z-10 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-slate-600 rounded-lg blur-sm"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-slate-600 p-2 rounded-lg">
                <Award size={28} className="text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                CertChain
              </h1>
              <p className="text-xs text-gray-400 font-medium">Blockchain Certificates</p>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Secure
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-slate-400 to-gray-400 bg-clip-text text-transparent">
              Digital Certificates
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Enterprise-grade blockchain certificates that are 
            <span className="text-blue-400 font-semibold"> tamper-proof</span>, 
            <span className="text-slate-400 font-semibold"> instantly verifiable</span>, and 
            <span className="text-gray-400 font-semibold"> permanently owned</span> by recipients.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
          <Link
            to="/admin"
            className="group relative overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:shadow-blue-500/10"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="relative mb-6">
                <div className="bg-gradient-to-r from-blue-500 to-slate-500 w-16 h-16 rounded-xl flex items-center justify-center">
                  <Shield size={32} className="text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Issue Certificates</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Create and mint blockchain certificates with PDF attachments and metadata
              </p>
              <div className="flex items-center gap-2 text-blue-400 font-semibold group-hover:gap-3 transition-all">
                <span>Launch Dashboard</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          <Link
            to="/student"
            className="group relative overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 rounded-2xl p-8 hover:border-slate-500/50 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:shadow-slate-500/10"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="relative mb-6">
                <div className="bg-gradient-to-r from-slate-500 to-gray-500 w-16 h-16 rounded-xl flex items-center justify-center">
                  <GraduationCap size={32} className="text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">My Credentials</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Access your digital certificates and download official PDF documents
              </p>
              <div className="flex items-center gap-2 text-slate-400 font-semibold group-hover:gap-3 transition-all">
                <span>View Collection</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          <Link
            to="/verifier"
            className="group relative overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-white/10 rounded-2xl p-8 hover:border-gray-500/50 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:shadow-gray-500/10"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative">
              <div className="relative mb-6">
                <div className="bg-gradient-to-r from-gray-500 to-slate-600 w-16 h-16 rounded-xl flex items-center justify-center">
                  <ShieldCheck size={32} className="text-white" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Verify Authenticity</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Instantly verify certificate authenticity on the blockchain network
              </p>
              <div className="flex items-center gap-2 text-gray-400 font-semibold group-hover:gap-3 transition-all">
                <span>Start Verification</span>
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>

        <div className="relative overflow-hidden bg-gradient-to-br from-slate-800/30 to-slate-900/50 rounded-2xl p-8 border border-white/10 backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-slate-500/5"></div>
          <div className="relative">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Enterprise Features</h2>
              <p className="text-gray-400 text-lg">Built for professional credential management</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="group flex gap-6 p-6 rounded-xl bg-gradient-to-r from-blue-500/10 to-transparent border border-blue-500/20 hover:border-blue-500/40 transition-all">
                <div className="relative">
                  <div className="bg-gradient-to-r from-blue-500 to-slate-500 p-3 rounded-lg">
                    <Lock size={24} className="text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">Cryptographically Secure</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Certificates are protected by blockchain cryptography and cannot be forged or tampered with
                  </p>
                </div>
              </div>

              <div className="group flex gap-6 p-6 rounded-xl bg-gradient-to-r from-slate-500/10 to-transparent border border-slate-500/20 hover:border-slate-500/40 transition-all">
                <div className="relative">
                  <div className="bg-gradient-to-r from-slate-500 to-gray-500 p-3 rounded-lg">
                    <Zap size={24} className="text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">High Performance</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Instant verification and minting with optimized smart contracts and modern Web3 infrastructure
                  </p>
                </div>
              </div>

              <div className="group flex gap-6 p-6 rounded-xl bg-gradient-to-r from-gray-500/10 to-transparent border border-gray-500/20 hover:border-gray-500/40 transition-all">
                <div className="relative">
                  <div className="bg-gradient-to-r from-gray-500 to-slate-600 p-3 rounded-lg">
                    <Users size={24} className="text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">Decentralized Ownership</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Recipients have true ownership of their credentials without relying on central authorities
                  </p>
                </div>
              </div>

              <div className="group flex gap-6 p-6 rounded-xl bg-gradient-to-r from-slate-600/10 to-transparent border border-slate-600/20 hover:border-slate-600/40 transition-all">
                <div className="relative">
                  <div className="bg-gradient-to-r from-slate-600 to-gray-600 p-3 rounded-lg">
                    <ShieldCheck size={24} className="text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">Trustless Verification</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Verify authenticity without contacting issuing institutions - the blockchain provides the truth
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
