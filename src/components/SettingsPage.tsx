import { Settings, Shield, Zap, Globe, Lock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { VPNSettings, VPNProtocol } from '@/types/vpn';

interface SettingsPageProps {
  settings: VPNSettings;
  onUpdateSettings: (settings: VPNSettings) => void;
}

export function SettingsPage({ settings, onUpdateSettings }: SettingsPageProps) {
  const updateSetting = <K extends keyof VPNSettings>(
    key: K,
    value: VPNSettings[K]
  ) => {
    onUpdateSettings({
      ...settings,
      [key]: value
    });
  };

  const protocolDescriptions = {
    'OpenVPN': 'Reliable and widely supported protocol',
    'WireGuard': 'Modern, fast, and lightweight protocol',
    'IKEv2': 'Great for mobile devices and quick reconnections'
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Settings className="w-6 h-6 text-primary" />
            <h1 className="text-2xl font-bold">Settings</h1>
          </div>
          <p className="text-muted-foreground">Customize your VPN experience</p>
        </div>

        {/* Connection Settings */}
        <Card className="vpn-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Connection</h2>
          </div>
          
          <div className="space-y-6">
            {/* Protocol Selection */}
            <div>
              <Label htmlFor="protocol" className="text-sm font-medium">
                VPN Protocol
              </Label>
              <Select
                value={settings.protocol}
                onValueChange={(value: VPNProtocol) => updateSetting('protocol', value)}
              >
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Select protocol" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(protocolDescriptions).map(([protocol, description]) => (
                    <SelectItem key={protocol} value={protocol}>
                      <div>
                        <div className="font-medium">{protocol}</div>
                        <div className="text-xs text-muted-foreground">{description}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Auto Connect */}
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-connect" className="text-sm font-medium">
                  Auto-connect on startup
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Automatically connect when the app starts
                </p>
              </div>
              <Switch
                id="auto-connect"
                checked={settings.autoConnect}
                onCheckedChange={(checked) => updateSetting('autoConnect', checked)}
              />
            </div>
          </div>
        </Card>

        {/* Security Settings */}
        <Card className="vpn-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Shield className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Security</h2>
          </div>
          
          <div className="space-y-6">
            {/* Kill Switch */}
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="kill-switch" className="text-sm font-medium">
                  Kill Switch
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Block internet if VPN disconnects unexpectedly
                </p>
              </div>
              <Switch
                id="kill-switch"
                checked={settings.killSwitch}
                onCheckedChange={(checked) => updateSetting('killSwitch', checked)}
              />
            </div>

            {/* DNS Leak Protection */}
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="dns-protection" className="text-sm font-medium">
                  DNS Leak Protection
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Prevent DNS queries from leaking outside the VPN tunnel
                </p>
              </div>
              <Switch
                id="dns-protection"
                checked={settings.dnsLeakProtection}
                onCheckedChange={(checked) => updateSetting('dnsLeakProtection', checked)}
              />
            </div>
          </div>
        </Card>

        {/* About */}
        <Card className="vpn-card p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Lock className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">SecureVPN</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Version 1.0.0 • Your privacy is our priority
          </p>
          <div className="flex justify-center gap-4 text-xs text-muted-foreground">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>Support</span>
          </div>
        </Card>
      </div>
    </div>
  );
}