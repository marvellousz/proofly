import { useState, useEffect } from 'react';
import { Wallet, LogOut } from 'lucide-react';
import { connectWallet, switchToLocalNetwork } from '../lib/blockchain';

interface WalletConnectProps {
  onConnect: (address: string) => void;
  connectedAddress: string | null;
}

export default function WalletConnect({ onConnect, connectedAddress }: WalletConnectProps) {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await switchToLocalNetwork();
      const { address } = await connectWallet();
      onConnect(address);
    } catch (error: any) {
      alert(error.message || 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDisconnect = () => {
    onConnect(null as any);
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          onConnect(null as any);
        } else {
          onConnect(accounts[0]);
        }
      });

      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      });
    }
  }, [onConnect]);

  return (
    <div>
      {!connectedAddress ? (
        <button
          onClick={handleConnect}
          disabled={isConnecting}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          <Wallet size={20} />
          {isConnecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      ) : (
        <div className="flex items-center gap-3 bg-gray-800 px-4 py-2.5 rounded-lg">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span className="text-white font-mono text-sm">
              {connectedAddress.slice(0, 6)}...{connectedAddress.slice(-4)}
            </span>
          </div>
          <button
            onClick={handleDisconnect}
            className="text-gray-400 hover:text-red-400 transition-colors"
          >
            <LogOut size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
