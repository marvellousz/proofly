export interface CertificateMetadata {
  name: string;
  description: string;
  studentName: string;
  course: string;
  grade: string;
  issueDate: string;
  university: string;
  pdfPath?: string;
}

export interface Certificate {
  tokenId: number;
  metadata: CertificateMetadata | null;
  tokenURI: string;
  isRevoked: boolean;
}

export interface WalletState {
  address: string | null;
  connected: boolean;
  chainId: number | null;
}
