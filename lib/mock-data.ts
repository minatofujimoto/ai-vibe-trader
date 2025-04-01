import { Position, MarketData, AgentDecision, PromptLog } from '@/types/trading';

export function generateMockPositions(): Position[] {
  return [
    {
      id: 'pos-1',
      symbol: 'BTC/USD',
      side: 'long',
      size: 0.5,
      entryPrice: 42000,
      currentPrice: 43500,
      pnl: 750,
      pnlPercentage: 3.57,
      openedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
      reasoning: 'Strong bullish momentum with increasing volume. RSI indicates room for growth.',
    },
    {
      id: 'pos-2',
      symbol: 'ETH/USD',
      side: 'long',
      size: 5,
      entryPrice: 2300,
      currentPrice: 2280,
      pnl: -100,
      pnlPercentage: -0.87,
      openedAt: new Date(Date.now() - 3600000 * 1).toISOString(),
      reasoning: 'Consolidation phase near support level. Expected breakout to upside.',
    },
  ];
}

export function generateMockMarketData(symbol: string): MarketData {
  const basePrice = symbol === 'BTC/USD' ? 43500 : 2280;
  const variance = basePrice * 0.02;
  
  return {
    symbol,
    price: basePrice + (Math.random() - 0.5) * variance,
    change24h: (Math.random() - 0.5) * 10,
    volume: Math.random() * 1000000000,
    high24h: basePrice * 1.05,
    low24h: basePrice * 0.95,
    timestamp: new Date().toISOString(),
  };
}

export function generateMockDecisions(): AgentDecision[] {
  const decisions: AgentDecision[] = [
    {
      id: 'dec-1',
      timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
      action: 'buy',
      symbol: 'BTC/USD',
      reasoning: 'Technical indicators show strong upward momentum. MACD crossing above signal line, RSI at 62 indicating bullish strength without being overbought.',
      confidence: 85,
      marketData: {
        price: 42000,
        volume: 8500000000,
        volatility: 2.3,
      },
      sentiment: 'bullish',
    },
    {
      id: 'dec-2',
      timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
      action: 'buy',
      symbol: 'ETH/USD',
      reasoning: 'Support level holding strong at $2250. Volume increasing suggesting accumulation phase.',
      confidence: 72,
      marketData: {
        price: 2300,
        volume: 450000000,
        volatility: 3.1,
      },
      sentiment: 'bullish',
    },
    {
      id: 'dec-3',
      timestamp: new Date(Date.now() - 3600000 * 1).toISOString(),
      action: 'hold',
      symbol: 'BTC/USD',
      reasoning: 'Position showing profit. Maintaining position as trend continues. Stop loss adjusted to entry price.',
      confidence: 78,
      marketData: {
        price: 43200,
        volume: 9200000000,
        volatility: 1.8,
      },
      sentiment: 'bullish',
    },
  ];
  
  return decisions;
}

export function generateMockPromptLogs(): PromptLog[] {
  return [
    {
      id: 'prompt-1',
      timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
      prompt: 'Analyze BTC/USD market conditions. Current price: $42,000. 24h change: +2.3%. Volume: $8.5B',
      response: JSON.stringify({
        action: 'buy',
        confidence: 85,
        reasoning: 'Technical indicators show strong upward momentum. MACD crossing above signal line.',
        sentiment: 'bullish',
        riskLevel: 'medium'
      }, null, 2),
      model: 'gpt-4',
      tokensUsed: 342,
    },
    {
      id: 'prompt-2',
      timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
      prompt: 'Analyze ETH/USD market conditions. Current price: $2,300. 24h change: -0.5%. Volume: $450M',
      response: JSON.stringify({
        action: 'buy',
        confidence: 72,
        reasoning: 'Support level holding strong. Volume increasing suggesting accumulation.',
        sentiment: 'bullish',
        riskLevel: 'medium'
      }, null, 2),
      model: 'gpt-4',
      tokensUsed: 298,
    },
  ];
}
// Unit feature implementation - 20250317_0014
// Unit feature implementation - 20250325_0029
// Unit feature implementation - 20250327_0034
// Unit feature implementation - 20250401_0039
