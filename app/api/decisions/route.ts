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
