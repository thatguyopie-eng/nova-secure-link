export type VPNStatus = 'connected' | 'disconnected' | 'connecting';

export type ServerLoad = 'low' | 'medium' | 'high';

export interface VPNServer {
  id: string;
  name: string;
  country: string;
  city: string;
  flag: string;
  latency: number;
  load: ServerLoad;
  isPremium: boolean;
}

export interface VPNConnection {
  status: VPNStatus;
  server: VPNServer | null;
  connectedAt: Date | null;
  bytesReceived: number;
  bytesSent: number;
}

export type VPNProtocol = 'OpenVPN' | 'WireGuard' | 'IKEv2';

export interface VPNSettings {
  protocol: VPNProtocol;
  autoConnect: boolean;
  killSwitch: boolean;
  dnsLeakProtection: boolean;
}