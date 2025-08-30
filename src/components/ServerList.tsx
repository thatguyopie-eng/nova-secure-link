import { Search, Wifi, Crown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { VPNServer, ServerLoad } from '@/types/vpn';
import { useState } from 'react';

interface ServerListProps {
  servers: VPNServer[];
  selectedServer: VPNServer | null;
  onSelectServer: (server: VPNServer) => void;
  onConnect: (server: VPNServer) => void;
}

export function ServerList({ servers, selectedServer, onSelectServer, onConnect }: ServerListProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredServers = servers.filter(server =>
    server.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
    server.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
    server.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getLoadColor = (load: ServerLoad) => {
    switch (load) {
      case 'low': return 'server-load-low';
      case 'medium': return 'server-load-medium';
      case 'high': return 'server-load-poor';
    }
  };

  const getLoadText = (load: ServerLoad) => {
    switch (load) {
      case 'low': return 'Excellent';
      case 'medium': return 'Good';
      case 'high': return 'Busy';
    }
  };

  const getLoadBars = (load: ServerLoad) => {
    const bars = [1, 2, 3];
    const activeBars = load === 'low' ? 3 : load === 'medium' ? 2 : 1;
    
    return (
      <div className="flex gap-1">
        {bars.map(bar => (
          <div
            key={bar}
            className={`w-1 h-4 rounded-full ${
              bar <= activeBars 
                ? getLoadColor(load).replace('text-', 'bg-')
                : 'bg-muted'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Choose Server</h1>
          <p className="text-muted-foreground">Select your preferred location</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search countries or cities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Server Grid */}
        <div className="space-y-3">
          {filteredServers.map((server) => (
            <Card
              key={server.id}
              className={`vpn-card p-4 cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                selectedServer?.id === server.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => onSelectServer(server)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-2xl">{server.flag}</div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{server.name}</h3>
                      {server.isPremium && (
                        <Crown className="w-4 h-4 text-yellow-500" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {server.city}, {server.country}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* Load Indicator */}
                  <div className="text-center">
                    <div className="flex items-center gap-2 mb-1">
                      {getLoadBars(server.load)}
                      <span className={`text-xs font-medium ${getLoadColor(server.load)}`}>
                        {getLoadText(server.load)}
                      </span>
                    </div>
                  </div>

                  {/* Latency */}
                  <div className="text-center">
                    <div className="flex items-center gap-1">
                      <Wifi className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">{server.latency}ms</span>
                    </div>
                  </div>

                  {/* Connect Button */}
                  <Button
                    size="sm"
                    variant={selectedServer?.id === server.id ? 'default' : 'outline'}
                    onClick={(e) => {
                      e.stopPropagation();
                      onConnect(server);
                    }}
                    className="min-w-[80px]"
                  >
                    {selectedServer?.id === server.id ? 'Connected' : 'Connect'}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredServers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No servers found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}