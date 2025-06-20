import { NextResponse } from 'next/server';
import tradingAgent from '@/lib/trading-agent';

export async function GET() {
  try {
    const prompts = tradingAgent.getPromptHistory();
    return NextResponse.json({ prompts });
  } catch (error) {
    console.error('Error fetching prompts:', error);
    return NextResponse.json({ prompts: [] }, { status: 500 });
  }
}
// Unit feature implementation - 20250407_0045
// Unit feature implementation - 20250421_0072
// Unit feature implementation - 20250502_0101
// Unit feature implementation - 20250521_0132
// Unit feature implementation - 20250523_0137
// Unit feature implementation - 20250530_0151
// Unit feature implementation - 20250605_0159
// Unit feature implementation - 20250610_0168
// Unit feature implementation - 20250620_0183
