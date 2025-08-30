import { useState, useEffect } from 'react';
import { VPNDashboard } from '@/components/VPNDashboard';
import { ServerList } from '@/components/ServerList';
import { SettingsPage } from '@/components/SettingsPage';
import { BottomNavigation } from '@/components/BottomNavigation';
import { VPNConnection, VPNSettings, VPNServer } from '@/types/vpn';
import { mockServers, getBestServer } from '@/data/mockServers';

type TabType = 'dashboard' | 'servers' | 'settings';

const Index = () => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [connection, setConnection] = useState<VPNConnection>({
    status: 'disconnected',
    server: null,
    connectedAt: null,
    bytesReceived: 0,
    bytesSent: 0
  });
  const [settings, setSettings] = useState<VPNSettings>({
    protocol: 'WireGuard',
    autoConnect: false,
    killSwitch: true,
    dnsLeakProtection: true
  });

  const handleConnect = (server?: VPNServer) => {
    const targetServer = server || getBestServer();
    
    setConnection(prev => ({
      ...prev,
      status: 'connecting',
      server: targetServer
    }));

    // Simulate connection delay
    setTimeout(() => {
      setConnection(prev => ({
        ...prev,
        status: 'connected',
        connectedAt: new Date()
      }));
    }, 2000);
  };

  const handleDisconnect = () => {
    setConnection(prev => ({
      ...prev,
      status: 'disconnected',
      server: null,
      connectedAt: null
    }));
  };

  const handleSelectServer = (server: VPNServer) => {
    if (connection.status === 'connected') {
      setConnection(prev => ({ ...prev, server }));
    }
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <VPNDashboard
            connection={connection}
            onConnect={() => handleConnect()}
            onDisconnect={handleDisconnect}
          />
        );
      case 'servers':
        return (
          <ServerList
            servers={mockServers}
            selectedServer={connection.server}
            onSelectServer={handleSelectServer}
            onConnect={handleConnect}
          />
        );
      case 'settings':
        return (
          <SettingsPage
            settings={settings}
            onUpdateSettings={setSettings}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderActiveTab()}
      <div className="pb-16">
        {/* Spacer for bottom navigation */}
      </div>
      <BottomNavigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />
    </div>
  );
};

export default Index;
