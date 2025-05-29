import { NextRequest, NextResponse } from 'next/server';
import tradingAgent from '@/lib/trading-agent';
import asterAPI from '@/lib/aster-api';

export async function POST(request: NextRequest) {
  try {
    const { symbol } = await request.json();

    if (!symbol) {
      return NextResponse.json(
        { error: 'Symbol is required' },
        { status: 400 }
      );
    }

    // Get market data
    const marketData = await asterAPI.getMarketData(symbol);

    // Analyze market and get decision
    const decision = await tradingAgent.analyzeMarket(symbol, marketData);

    // Execute the decision if confidence is high
    const executed = await tradingAgent.executeDecision(decision);

    return NextResponse.json({
      decision,
      executed,
      message: executed ? 'Trade executed successfully' : 'Decision logged, no trade executed',
    });
  } catch (error: any) {
    console.error('Error in trading agent:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to analyze market' },
      { status: 500 }
    );
  }
}
// Unit feature implementation - 20250312_0004
// Unit feature implementation - 20250325_0028
// Unit feature implementation - 20250326_0030
// Unit feature implementation - 20250326_0032
// Unit feature implementation - 20250423_0076
// Unit feature implementation - 20250429_0090
// Unit feature implementation - 20250429_0091
// Unit feature implementation - 20250514_0118
// Unit feature implementation - 20250516_0124
// Unit feature implementation - 20250516_0125
// Unit feature implementation - 20250526_0141
// Unit feature implementation - 20250529_0146
