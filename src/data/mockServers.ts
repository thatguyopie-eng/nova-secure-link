import { VPNServer } from '@/types/vpn';

export const mockServers: VPNServer[] = [
  {
    id: '1',
    name: 'Ultra Fast',
    country: 'United States',
    city: 'New York',
    flag: '🇺🇸',
    latency: 12,
    load: 'low',
    isPremium: false
  },
  {
    id: '2',
    name: 'Lightning',
    country: 'Germany',
    city: 'Frankfurt',
    flag: '🇩🇪',
    latency: 24,
    load: 'low',
    isPremium: false
  },
  {
    id: '3',
    name: 'Secure Plus',
    country: 'United Kingdom',
    city: 'London',
    flag: '🇬🇧',
    latency: 18,
    load: 'medium',
    isPremium: true
  },
  {
    id: '4',
    name: 'Speed Demon',
    country: 'Japan',
    city: 'Tokyo',
    flag: '🇯🇵',
    latency: 45,
    load: 'low',
    isPremium: false
  },
  {
    id: '5',
    name: 'Turbo Stream',
    country: 'Canada',
    city: 'Toronto',
    flag: '🇨🇦',
    latency: 28,
    load: 'medium',
    isPremium: false
  },
  {
    id: '6',
    name: 'Premium Shield',
    country: 'Netherlands',
    city: 'Amsterdam',
    flag: '🇳🇱',
    latency: 22,
    load: 'high',
    isPremium: true
  },
  {
    id: '7',
    name: 'Stealth Mode',
    country: 'Singapore',
    city: 'Singapore',
    flag: '🇸🇬',
    latency: 67,
    load: 'low',
    isPremium: true
  },
  {
    id: '8',
    name: 'Rocket Speed',
    country: 'Australia',
    city: 'Sydney',
    flag: '🇦🇺',
    latency: 89,
    load: 'medium',
    isPremium: false
  }
];

export const getBestServer = (): VPNServer => {
  return mockServers
    .filter(server => server.load === 'low')
    .sort((a, b) => a.latency - b.latency)[0] || mockServers[0];
};