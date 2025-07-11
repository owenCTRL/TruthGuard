interface Story {
  id: string;
  title: string;
  category: 'US' | 'WORLD' | 'POLITICS' | 'BUSINESS' | 'HEALTH' | 'ENTERTAINMENT' | 'ECONOMICS' | 'CYBER' | 'ENERGY' | 'DEFENSE';
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  location: { lat: number; lng: number; name: string; country: string };
  reliability: number;
  bias: number;
  impact: number;
  sources: number;
  timestamp: Date;
  summary: string;
  keyPlayers: string[];
  sentiment: 'POSITIVE' | 'NEGATIVE' | 'NEUTRAL';
  connections?: string[];
  truthScore?: number;
  abstractedContent?: string;
  biasedClaims?: string[];
  verifiedFacts?: string[];
}

export type { Story };