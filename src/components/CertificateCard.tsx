import { Award, Calendar, BookOpen, GraduationCap, AlertCircle } from 'lucide-react';
import { Certificate } from '../types';

interface CertificateCardProps {
  certificate: Certificate;
}

export default function CertificateCard({ certificate }: CertificateCardProps) {
  const { metadata, tokenId, isRevoked } = certificate;

  if (!metadata) {
    return (
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <p className="text-gray-400">Loading metadata...</p>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border-2 transition-all hover:scale-[1.02] ${
      isRevoked ? 'border-red-500 opacity-60' : 'border-gray-700 hover:border-blue-500'
    }`}>
      {isRevoked && (
        <div className="flex items-center gap-2 bg-red-900/30 text-red-400 px-3 py-2 rounded-lg mb-4 text-sm">
          <AlertCircle size={16} />
          <span>This certificate has been revoked</span>
        </div>
      )}

      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-3 rounded-lg">
            <Award size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{metadata.name}</h3>
            <p className="text-sm text-gray-400">Token ID: #{tokenId}</p>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-gray-300">
          <GraduationCap size={18} className="text-blue-400" />
          <span className="font-semibold">{metadata.studentName}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-300">
          <BookOpen size={18} className="text-green-400" />
          <span>{metadata.course}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-300">
          <Award size={18} className="text-yellow-400" />
          <span>Grade: {metadata.grade}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-300">
          <Calendar size={18} className="text-purple-400" />
          <span>{metadata.issueDate}</span>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-700">
        <p className="text-sm text-gray-400">{metadata.university}</p>
      </div>
    </div>
  );
}
