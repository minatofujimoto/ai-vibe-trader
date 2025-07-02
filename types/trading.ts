export interface Position {
  id: string;
  symbol: string;
  side: 'long' | 'short';
  size: number;
  entryPrice: number;
  currentPrice: number;
  pnl: number;
  pnlPercentage: number;
  openedAt: string;
  reasoning: string;
}

export interface PromptLog {
  id: string;
  timestamp: string;
  prompt: string;
  response: string;
  model: string;
  tokensUsed: number;
}

export interface AgentDecision {
  id: string;
  timestamp: string;
  action: 'buy' | 'sell' | 'hold' | 'close';
  symbol: string;
  reasoning: string;
  confidence: number;
  marketData: {
    price: number;
    volume: number;
    volatility: number;
  };
  sentiment: 'bullish' | 'bearish' | 'neutral';
}

export interface MarketData {
  symbol: string;
  price: number;
  change24h: number;
  volume: number;
  high24h: number;
  low24h: number;
  timestamp: string;
}

export interface TradeOrder {
  symbol: string;
  side: 'buy' | 'sell';
  size: number;
  type: 'market' | 'limit';
  price?: number;
}

export interface AsterAPIResponse {
  success: boolean;
  data?: any;
  error?: string;
}
// Unit feature implementation - 20250312_0005
// Unit feature implementation - 20250313_0009
// Unit feature implementation - 20250321_0023
// Unit feature implementation - 20250402_0040
// Unit feature implementation - 20250414_0058
// Unit feature implementation - 20250425_0083
// Unit feature implementation - 20250425_0084
// Unit feature implementation - 20250429_0089
// Unit feature implementation - 20250501_0096
// Unit feature implementation - 20250502_0099
// Unit feature implementation - 20250520_0130
// Unit feature implementation - 20250606_0161
// Unit feature implementation - 20250702_0200
