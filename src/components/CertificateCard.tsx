import { Award, Calendar, BookOpen, GraduationCap, AlertCircle, FileText, Download, Eye } from 'lucide-react';
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
    <div className={`relative overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-6 border transition-all hover:scale-[1.02] backdrop-blur-sm ${
      isRevoked ? 'border-red-500/50 opacity-60' : 'border-white/10 hover:border-purple-500/50'
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
        <p className="text-sm text-gray-400 mb-3">{metadata.university}</p>
        
        {metadata.pdfPath && (
          <div className="flex gap-2">
            <button
              onClick={() => window.open(metadata.pdfPath, '_blank')}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <Eye size={16} />
              View PDF
            </button>
            <button
              onClick={() => {
                const link = document.createElement('a');
                link.href = metadata.pdfPath!;
                link.download = `certificate-${tokenId}.pdf`;
                link.click();
              }}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            >
              <Download size={16} />
              Download
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
