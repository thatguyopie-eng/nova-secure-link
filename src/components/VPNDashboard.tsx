import { useState, useEffect } from 'react';
import { Shield, Zap, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { VPNStatus, VPNConnection } from '@/types/vpn';
import { getBestServer } from '@/data/mockServers';

interface VPNDashboardProps {
  connection: VPNConnection;
  onConnect: () => void;
  onDisconnect: () => void;
}

export function VPNDashboard({ connection, onConnect, onDisconnect }: VPNDashboardProps) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggleConnection = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);
    
    if (connection.status === 'connected') {
      onDisconnect();
    } else {
      onConnect();
    }
  };

  const getStatusColor = () => {
    switch (connection.status) {
      case 'connected': return 'text-connected';
      case 'connecting': return 'text-connecting';
      default: return 'text-disconnected';
    }
  };

  const getStatusText = () => {
    switch (connection.status) {
      case 'connected': return 'Protected';
      case 'connecting': return 'Connecting...';
      default: return 'Not Protected';
    }
  };

  const getButtonClass = () => {
    switch (connection.status) {
      case 'connected': return 'btn-disconnect';
      case 'connecting': return 'btn-connecting';
      default: return 'btn-connect';
    }
  };

  const getButtonText = () => {
    switch (connection.status) {
      case 'connected': return 'Disconnect';
      case 'connecting': return 'Connecting...';
      default: return 'Connect';
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold">SecureVPN</h1>
          </div>
          <p className="text-muted-foreground">Your privacy shield</p>
        </div>

        {/* Status Card */}
        <Card className="vpn-card p-8 text-center">
          <div className="space-y-6">
            {/* Status Indicator */}
            <div className="relative">
              <div className={`w-32 h-32 mx-auto rounded-full border-8 flex items-center justify-center transition-all duration-500 ${
                connection.status === 'connected' 
                  ? 'border-connected shadow-connected/30' 
                  : connection.status === 'connecting'
                  ? 'border-connecting animate-pulse'
                  : 'border-disconnected'
              } ${isAnimating ? 'scale-110' : ''}`}>
                <Shield className={`w-16 h-16 ${getStatusColor()}`} />
              </div>
              
              {/* Status Dot */}
              <div className={`absolute -top-2 -right-2 ${
                connection.status === 'connected' 
                  ? 'status-dot-connected'
                  : connection.status === 'connecting'
                  ? 'status-dot-connecting'
                  : 'status-dot-disconnected'
              }`} />
            </div>

            {/* Status Text */}
            <div>
              <h2 className={`text-xl font-semibold ${getStatusColor()}`}>
                {getStatusText()}
              </h2>
              {connection.server && (
                <p className="text-muted-foreground mt-2">
                  {connection.server.flag} {connection.server.city}, {connection.server.country}
                </p>
              )}
            </div>

            {/* Connect Button */}
            <Button
              size="lg"
              className={`w-full h-14 text-lg font-semibold transition-all duration-300 ${getButtonClass()}`}
              onClick={handleToggleConnection}
              disabled={connection.status === 'connecting'}
            >
              {getButtonText()}
            </Button>
          </div>
        </Card>

        {/* Quick Stats */}
        {connection.status === 'connected' && (
          <div className="grid grid-cols-2 gap-4">
            <Card className="vpn-card p-4 text-center">
              <Zap className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Latency</p>
              <p className="font-semibold">{connection.server?.latency}ms</p>
            </Card>
            <Card className="vpn-card p-4 text-center">
              <Globe className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Protocol</p>
              <p className="font-semibold">WireGuard</p>
            </Card>
          </div>
        )}

        {/* Auto-connect suggestion */}
        {connection.status === 'disconnected' && (
          <Card className="vpn-card p-4 text-center">
            <Zap className="w-6 h-6 text-primary mx-auto mb-2" />
            <h3 className="font-semibold mb-1">Quick Connect</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Auto-select the fastest server
            </p>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setIsAnimating(true);
                setTimeout(() => setIsAnimating(false), 500);
                onConnect();
              }}
              className="w-full"
            >
              Connect to Best Server
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}