import { NextResponse } from 'next/server';
import tradingAgent from '@/lib/trading-agent';

export async function GET() {
  try {
    const decisions = tradingAgent.getDecisionHistory();
    return NextResponse.json({ decisions });
  } catch (error) {
    console.error('Error fetching decisions:', error);
    return NextResponse.json({ decisions: [] }, { status: 500 });
  }
}
// Unit feature implementation - 20250311_0003
// Unit feature implementation - 20250312_0007
// Unit feature implementation - 20250402_0041
// Unit feature implementation - 20250403_0042
// Unit feature implementation - 20250417_0069
// Unit feature implementation - 20250428_0086
// Unit feature implementation - 20250513_0115
